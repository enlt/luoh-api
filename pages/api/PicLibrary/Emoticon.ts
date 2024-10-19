import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

// 获取 JSON 链接
const getJsonLink = (type: string): string => 
  `https://api.luoh-an.me/storage/json/image/emoticon/${type}/.json`;

// 获取图片链接
const getImageLink = (type: string, value: string): string => 
  `https://new-api-1.pages.dev/image/emoticon/${type}/${value}`;

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
const handleError = (res: NextApiResponse, status: number, message: string) => 
  res.status(status).json({ status: status.toString(), error: message });

// 主处理函数
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 设置跨域头部，允许所有域名访问
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const type = req.query.t as string;
  const returnType = (req.query.r as string) || 'image';

  if (!type) return handleError(res, 400, '参数错误：缺少必要参数');

  try {
    const jsonResponse = await fetch(getJsonLink(type));
    if (!jsonResponse.ok) throw new Error('请求失败，无法获取 JSON 数据');

    const randomValue = getRandomValueFromJson(await jsonResponse.text());
    if (!randomValue) return handleError(res, 500, '远程获取值失败：无可用数据');

    const imageLink = getImageLink(type, randomValue);

    if (returnType === 'image') {
      const imageResponse = await fetch(imageLink);
      if (!imageResponse.ok) throw new Error('无法获取图片');

      const buffer = await imageResponse.buffer();
      res.setHeader('Content-Type', getMimeType(randomValue));
      return res.send(buffer);
    }

    if (returnType === 'json') {
      return res.status(200).json({ status: '200', url: imageLink });
    }

    return handleError(res, 400, '参数错误：无效的返回类型');
  } catch (error) {
    // 这里将 error 断言为 Error 类型，以便访问 message 属性
    return handleError(res, 500, '服务端错误：' + (error instanceof Error ? error.message : '未知错误'));
  }
}
