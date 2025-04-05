import { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  const errorMessage = err.status ? err.message : "Erro interno no servidor";
  const statusCode = err.status || 500;
  res.status(statusCode).json({ message: errorMessage });
  next();
};
