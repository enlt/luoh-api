import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://luohanapi:luohanapi@luohanapi.3lv3y.mongodb.net/tokens?retryWrites=true&w=majority";
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

// 使用单例模式防止多次创建连接
if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('tokens');
    const collection = db.collection('free1');

    if (req.method === 'GET') {
      // 获取所有 tokens 数据
      const tokens = await collection.find({}).toArray();
      res.status(200).json(tokens);
    } else if (req.method === 'POST') {
      // 添加新 token 数据
      const newToken = req.body;
      const result = await collection.insertOne(newToken);
      res.status(201).json({ message: 'Token added successfully', result });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
