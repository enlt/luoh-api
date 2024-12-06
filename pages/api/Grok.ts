import type { NextApiRequest, NextApiResponse } from 'next';

// 自定义错误类,引导使用者
class ApiError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // 取参数,细心思:
        const { question, key, system } = getGrokParams(req);

        // 构造Grok API请求
        const url = `https://api.x.ai/v1/chat/completions`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
        };
        const data = {
            messages: [
                { role: 'system', content: system ? system : "You are Grok, a chatbot inspired by the Hitchhikers Guide to the Galaxy." },
                { role: 'user', content: question }
            ],
            model: "grok-beta",
            stream: false,
            temperature: 0
        };

        // 请求Grok,期待回应:
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        // 应答处理,细心思量:
        if (!response.ok) {
            const errorMessage = responseData.error || `HTTP 故障! 状态码: ${response.status}`;
            throw new ApiError(response.status, errorMessage);
        }

        return res.status(200).json(responseData);

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        const err = error as Error;
        return res.status(500).json({ error: `机巧失效: ${err.message}` });
    }
}

// 获取Grok之参数
function getGrokParams(req: NextApiRequest) {
    const { question, key, system } = req.body || req.query;

    if (!question || !key) {
        throw new ApiError(400, '缺少必需之参数: question, key.');
    }

    return { question, key, system };
}