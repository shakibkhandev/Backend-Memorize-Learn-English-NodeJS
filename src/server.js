import app from "./app.js";
import logger from "./logger/winston.logger.js";

const startServer = () => {
  const port = process.env.PORT || 8080;
  app.listen(port, async () => {
    logger.info(
      `📑 Visit the documentation at: http://localhost:${
        process.env.PORT || 8080
      }/docs`
    );
    logger.info("⚙️  Server is running on port: " + process.env.PORT);
  });
};

startServer();
