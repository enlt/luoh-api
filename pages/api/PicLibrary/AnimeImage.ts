import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

// 获取 JSON 链接
const getJsonLink = (type: string): string => 
  `https://cdn.s3.luoh-an.me/luoh-an-api/json/image/ecy/${type}/.json`;

// 获取图片链接
const getImageLink = (type: string, value: string): string => 
  `https://cdn.s2.luoh-an.me/image/ecy/${type}/${value}`;

// 从 JSON 内容中随机获取值
const getRandomValueFromJson = (jsonContent: string): string | null => {
  const values = JSON.parse(jsonContent);
  return Array.isArray(values) && values.length > 0
    ? values[Math.floor(Math.random() * values.length)]
    : null;
};

// 获取图片 MIME 类型
const getMimeType = (imageName: string): string => {
  const mimeTypes: Record<string, string> = {
    webp: 'image/webp',
    png: 'image/png',
    jpg: 'image/jpg',
  };
  return mimeTypes[imageName.split('.').pop()?.toLowerCase() || ''] || 'application/octet-stream';
};

// 处理错误响应
const handleError = (res: NextApiResponse, status: number, message: string, startTime: number) => {
  const responseTime = (Date.now() - startTime) / 1000;
  res.status(status).json({
    status: status.toString(),
    error: message,
    responseTime: responseTime.toFixed(8) + 's',
  });
};

// 主处理函数
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const startTime = Date.now(); // 开始时间

  // 设置跨域头部，允许所有域名访问
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const type = req.query.t as string;
  const returnType = (req.query.r as string) || 'image';

  if (!type) return handleError(res, 400, '参数错误：缺少必要参数', startTime);

  try {
    const jsonResponse = await fetch(getJsonLink(type));
    if (!jsonResponse.ok) throw new Error('请求失败，无法获取 JSON 数据');

    const randomValue = getRandomValueFromJson(await jsonResponse.text());
    if (!randomValue) return handleError(res, 500, '远程获取值失败：无可用数据', startTime);

    const imageLink = getImageLink(type, randomValue);

    if (returnType === 'image') {
      const imageResponse = await fetch(imageLink);
      if (!imageResponse.ok) throw new Error('无法获取图片');

      const buffer = await imageResponse.buffer();
      res.setHeader('Content-Type', getMimeType(randomValue));
      res.setHeader('X-Response-Time', ((Date.now() - startTime) / 1000).toFixed(8) + 's');
      return res.send(buffer);
    }

    if (returnType === 'json') {
      const responseTime = (Date.now() - startTime) / 1000;
      return res.status(200).json({
        status: '200',
        url: imageLink,
        responseTime: responseTime.toFixed(8) + 's',
      });
    }

    return handleError(res, 400, '参数错误：无效的返回类型', startTime);
  } catch (error) {
    return handleError(
      res,
      500,
      '服务端错误：' + (error instanceof Error ? error.message : '未知错误'),
      startTime,
    );
  }
}