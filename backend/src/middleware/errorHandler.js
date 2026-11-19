
export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
}

export function errorHandler(err, req, res, next) {
  console.error("Server error:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
