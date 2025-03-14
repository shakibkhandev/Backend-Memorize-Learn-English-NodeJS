const serverRunning = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is running!",
  });
};

const healthCheck = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is healthy!",
  });
};

module.exports = { serverRunning, healthCheck };
