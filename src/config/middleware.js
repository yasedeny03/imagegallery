import express from 'express';

export const setupMiddleware = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};