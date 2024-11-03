import { NextApiRequest, NextApiResponse } from 'next';

// 根据文件扩展名获取对应的 MIME 类型
const getMimeType = (extension: string): string => {
    const mimeTypes: Record<string, string> = {
        webp: 'image/webp',
        png: 'image/png',
        jpg: 'image/jpg',
    };
    return mimeTypes[extension] || 'application/octet-stream'; // 如果找不到对应类型，返回默认类型
};

// 返回存放图片名称的 JSON 链接
const getJsonLink = (): string => 'https://cdn.s3.luoh-an.me/luoh-an-api/json/image/other/.json';

// 根据图片名称生成图片的 URL
const getImageLink = (value: string): string => `https://cdn.s1.luoh-an.me/image/other/${value}`;

// 处理错误响应
const handleError = (res: NextApiResponse, message: string): void => {
    res.status(400).json({ status: '400', error: message });
};

// 主处理函数，负责根据请求返回 JSON 或图片
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 设置跨域头部，允许所有域名访问
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const returnType = (req.query.r as string) || 'image'; // 获取返回类型，默认为 image

    try {
        const jsonResponse = await fetch(getJsonLink()); // 请求远程 JSON 文件
        if (!jsonResponse.ok) throw new Error('远程获取失败');
        
        const jsonData = await jsonResponse.json(); // 解析 JSON 数据
        if (!Array.isArray(jsonData)) throw new Error('服务端数据格式错误');

        const randomImage = jsonData[Math.floor(Math.random() * jsonData.length)]; // 随机选择一个图片名称
        const imageUrl = getImageLink(randomImage); // 生成对应的图片 URL

        if (returnType === 'json') {
            return res.status(200).json({ status: 200, url: imageUrl }); // 返回图片 URL 作为 JSON
        }

        if (returnType === 'image') {
            // 获取并返回图片内容
            const imageResponse = await fetch(imageUrl);
            if (!imageResponse.ok) throw new Error('图片获取失败');

            const arrayBuffer = await imageResponse.arrayBuffer(); // 获取图片的 ArrayBuffer 数据
            const buffer = Buffer.from(arrayBuffer); // 将 ArrayBuffer 转换为 Buffer
            const extension = randomImage.split('.').pop() || ''; // 获取文件扩展名
            const mimeType = getMimeType(extension); // 获取 MIME 类型
            res.setHeader('Content-Type', mimeType);
            return res.send(buffer); // 返回图片数据
        }

        return handleError(res, '参数错误：无效的返回类型'); // 返回类型无效时返回错误
    } catch (error) {
        return handleError(res, error instanceof Error ? error.message : '未知错误'); // 捕获并处理错误
    }
}
