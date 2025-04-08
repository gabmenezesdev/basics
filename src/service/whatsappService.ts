import axios from "axios";

export class WhatsAppService {
  constructor() {}

  async sendWhatsappTextMessage(
    phoneNumber: string,
    message: string,
    delay: number = 0
  ): Promise<void> {
    await axios.post(
      `${process.env.EVOLUTION_API_URL}/message/sendText/${process.env.EVOLUTION_API_CHANNEL}`,
      {
        number: phoneNumber,
        text: message,
        delay: delay,
      },
      {
        headers: {
          apikey: process.env.EVOLUTION_API_SECRET_KEY,
        },
      }
    );
  }
}
