require("dotenv/config");
const express = require("express");
const routes = require("./routes");
const { rateLimit } = require("express-rate-limit");
const morganMiddleware = require("./logger/morgan.logger");
const cors = require("cors");
const { fileURLToPath } = require("url");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const YAML = require("yaml");
const requestIp = require("request-ip");
const swaggerUi = require("swagger-ui-express");




const file = fs.readFileSync(path.resolve(__dirname, "./swagger.yml"), "utf8");

const swaggerDocument = YAML.parse(
  file?.replace(
    "- url: ${{server}}",
    `- url: ${process.env.FRONTEND_HOST_URL || "http://localhost:8080"}/api/v1`
  )
);




const app = express();
app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN === "*"
        ? "*" // This might give CORS error for some origins due to credentials set to true
        : process.env.CORS_ORIGIN?.split(","), // For multiple cors origin for production. Refer https://github.com/hiteshchoudhary/apihub/blob/a846abd7a0795054f48c7eb3e71f3af36478fa96/.env.sample#L12C1-L12C12
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: [""],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 600, // 10 minutes
  })
);

app.use(requestIp.mw());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5000, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req, res) => {
    return req.clientIp; // IP address from requestIp.mw(), as opposed to req.ip
  },
  handler: (_, __, ___, options) => {
    throw new ApiError(
      options.statusCode || 500,
      `There are too many requests. You are only allowed ${
        options.max
      } requests per ${options.windowMs / 60000} minutes`
    );
  },
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally
app.use(cookieParser());

app.use(morganMiddleware);

app.use("/api/v1", routes);


// * API DOCS
// ? Keeping swagger code at the end so that we can load swagger on "/" route
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      swaggerOptions: {
        docExpansion: "none", // keep all the sections collapsed by default
      },
      customSiteTitle: "Memorize Learn English APi Docs",
    })
  );
  



module.exports = app;