import axios from "axios";

export class WhatsAppService {
  constructor() {}

  async sendWhatsappTextMessage(
    phoneNumber: string,
    message: string
  ): Promise<void> {
    await axios.post(
      `${process.env.EVOLUTION_API_URL}/message/sendText`,
      {
        number: phoneNumber,
        text: message,
      },
      {
        headers: {
          apikey: process.env.EVOLUTION_API_SECRET_KEY,
        },
      }
    );
  }
}
