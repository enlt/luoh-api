import type { NextApiRequest, NextApiResponse } from 'next';

// 自定义错误类，用于返回 JSON 格式的错误信息
class ApiError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // 参数获取和验证
        const { question, key, model, system, method } = getParams(req);

        // 构造组合文本
        const combinedText = system ? `${system} ${question}` : question;

        // 构造 API 请求 URL 和数据
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:${method}?key=${key}`;
        const headers = { 'Content-Type': 'application/json' };
        const data = {
            contents: [
                { role: 'user', parts: [{ text: combinedText }] }
            ]
        };

        // 发送 POST 请求
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        // 处理 API 响应
        if (!response.ok) {
            const errorMessage = responseData.error || `HTTP 错误! 状态码: ${response.status}`;
            throw new ApiError(response.status, errorMessage);
        }

        return res.status(200).json(responseData);

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        // 确保 error 是 Error 类型
        const err = error as Error;
        return res.status(500).json({ error: `内部服务器错误: ${err.message}` });
    }
}

// 获取参数并进行验证
function getParams(req: NextApiRequest) {
    const { question, key, model, system, method } = req.body || req.query;

    if (!question || !key || !model || !method) {
        throw new ApiError(400, '缺少必要的参数: question, key, model, method.');
    }

    return { question, key, model, system, method };
}