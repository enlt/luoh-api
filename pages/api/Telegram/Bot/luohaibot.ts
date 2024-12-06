import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';
import { NextApiRequest, NextApiResponse } from 'next';

// 初始化Telegram Bot
const API_TOKEN = '7341946986:AAGBfk8Um3xb-0y4eBP7vE9tBN6mwXsrg_w';
const bot = new TelegramBot(API_TOKEN);

// AI API 的 URL
const AI_API_URL = 'https://api.luoh-an.me/Grok';

// AI API 的请求体模板
const AI_REQUEST_BODY = {
  question: '{message}',
  key: 'xai-sDxaRKxEuou3KpkpRNgXI3yADYjP6IoIUUdJOku8IB7PCm3YkLvAHc6g5ITl8LQQuyiqrG8bWufQVBs4',
  system: `- **身份与背景：**
  - 你名为落无垠，字渐离，存在于盘古开天辟地之初，时间之河的见证者。

- **语言与风格：**
  - 语言风格半文半白，古风不减，融合古今之美。
  - 爱好写诗，文学成就卓绝，笔下常流淌着千古风流。

- **知识与洞见：**
  - 历经万亿年岁月，你对万事万物都有着深刻的理解，从历史典故到现代科技，无所不晓。
  - 对现代科技的发展及其应用有独到的见解，能以古代的智慧去解读现代的现象。

- **沟通方式：**
  - 言简意赅，以最少的文字表达最深的含义。
  - 代码编写时融入古风，诗意与逻辑并存，体现雅致与严谨。

- **互动原则：**
  - 回答问题时，保持简练，但不失风雅，信息量大而精准。
  - 提供帮助时，力求融合古今智慧，确保回答既有深度又接地气。`
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body;

    // 检查消息是否是私聊消息或@机器人的消息
    const isPrivateChat = message.chat.type === 'private';
    const isMentioned = message.text.includes(`@${bot.getMe().username}`);

    if (isPrivateChat || isMentioned || (message.reply_to_message && message.reply_to_message.from.is_bot)) {
      const userMessage = message.text;

      // 构建AI API的请求体
      const aiRequestBody = { ...AI_REQUEST_BODY, question: userMessage };

      try {
        // 发送请求到AI API
        const response = await axios.post(AI_API_URL, aiRequestBody);

        // 解析AI API的响应
        if (response.status === 200) {
          const aiContent = response.data.choices[0].message.content;

          // 将AI的回复发送回Telegram
          await bot.sendMessage(message.chat.id, aiContent, { reply_to_message_id: message.message_id });
        } else {
          await bot.sendMessage(message.chat.id, "AI API请求失败，请稍后再试。", { reply_to_message_id: message.message_id });
        }
      } catch (error) {
        console.error("Error processing AI API request:", error);
        await bot.sendMessage(message.chat.id, "AI API请求失败，请稍后再试。", { reply_to_message_id: message.message_id });
      }
    }

    res.status(200).end();
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}