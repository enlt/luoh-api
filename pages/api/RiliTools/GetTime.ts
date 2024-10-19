import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // 设置跨域头部，允许所有域名访问
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 设置时区参数，默认是 'Asia/Shanghai'
    const timezone = req.query.timezone ? req.query.timezone as string : 'Asia/Shanghai';

    // 匹配 UTC 格式时区，例如：UTC+8
    const utcRegex = /^UTC([+-]\d{1,2})$/;
    let selectedTimezone = timezone;

    // 如果是 UTC 格式，则解析为实际的时区名
    if (utcRegex.test(timezone)) {
        const matches = timezone.match(utcRegex);
        if (matches) {
            const offset = parseInt(matches[1], 10);
            const timezoneFromAbbr = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
            selectedTimezone = timezoneFromAbbr;
        }
    }

    // 验证时区是否合法
    const validTimezones = Intl.supportedValuesOf('timeZone');
    process.env.TZ = validTimezones.includes(selectedTimezone) ? selectedTimezone : 'Asia/Shanghai'; // 设置为合法时区或默认

    // 获取当前日期，使用ISO 8601格式：yyyy-mm-dd
    const currentDate = new Date().toLocaleDateString('en-CA'); 
    const year = new Date().getFullYear().toString();
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const day = new Date().getDate().toString().padStart(2, '0');

    // 构建返回的 JSON 数据
    const response = {
        date: currentDate,  // 完整日期
        year: year,  // 年
        month: month,  // 月
        day: day,  // 日
        timezone: process.env.TZ  // 当前时区
    };

    // 设置响应为 JSON 格式并返回数据
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
}
