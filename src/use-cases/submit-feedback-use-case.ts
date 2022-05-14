import { MailAdpater } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repository/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {

  constructor(
    private feedbacksRepository: FeedbackRepository,
    private mailAdapter: MailAdpater
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const {type, comment, screenshot} = request;

    if (!type){
      throw new Error('Type is required');
    }

    if (!comment){
      throw new Error('Comment is required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot format');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px;color: #111;">`,
        `<p> Tipo do Feedback: ${type}</p>`,
        `<p> Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}"/>` : '',
        `</div>`
      ].join('\n')
    })
  }
}