export const successResponse = (res, status, message, data = null) => {
  res.status(status).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

export const errorResponse = (res, status, message) => {
  res.status(status).json({
    success: false,
    message,
    timestamp: new Date().toISOString()
  });
};