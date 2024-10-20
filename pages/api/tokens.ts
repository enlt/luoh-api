import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

const uri = "mongodb+srv://luohanapi:luohanapi@luohanapi.3lv3y.mongodb.net/tokens?retryWrites=true&w=majority";
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

// 使用单例模式防止多次创建连接
if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('tokens');
    const collection = db.collection('free1');

    // 只处理 GET 请求，获取并展示数据
    const tokens = await collection.find({}).toArray();
    res.status(200).json(tokens);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
