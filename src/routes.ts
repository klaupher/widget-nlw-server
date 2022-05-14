import express from "express";
import { NodemailerMailAdpater } from "./adapters/nodemailer/nodemailer-adapter";
import { PrismaFeedbackRepository } from "./repository/prisma/prisma-feedback-repository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";


export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const {type, comment, screenshot} = req.body;
  
  const prismaFeedbacksRepository = new PrismaFeedbackRepository();
  const mailAdapter = new NodemailerMailAdpater();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    mailAdapter
  );
  
  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });


  
  return res.status(201).json({message: "Sucesso na execução"});
})