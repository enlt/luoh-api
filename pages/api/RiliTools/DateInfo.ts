import type { NextApiRequest, NextApiResponse } from 'next';
import { Solar } from 'lunar-typescript';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 设置跨域头部，允许所有域名访问
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // 设置时区为上海
    process.env.TZ = 'Asia/Shanghai';

    // 获取请求中的日期参数，如果没有则使用当前日期
    const today = req.query.date ? req.query.date as string : new Date().toISOString().split('T')[0];
    
    // 将日期字符串拆分为年、月、日
    const [year, month, day] = today.split('-').map(Number);

    // 创建阳历（Solar）实例
    const solar = Solar.fromYmd(year, month, day);

    // 获取农历信息
    const lunarResult = solar.getLunar();  // 转换为农历

    // 通过远程API获取随机诗词内容
    let text: string;
    try {
        const { data } = await axios.get('https://api.luoh-an.me/Yiyan/?t=诗词/all');
        text = data || '天之道，损有余而补不足。';  // 如果API没有返回内容，则使用默认句子
    } catch (error) {
        text = '天之道，损有余而补不足。';  // 出现错误时使用默认诗句
    }

    // 构建返回的JSON数据
    const response = {
        date: new Date(today).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
        dateD: day.toString().padStart(2, '0'),  // 补齐日期位数
        dateM: month.toString().padStart(2, '0'),  // 补齐月份位数
        dateMC: month.toString(),  // 月份，不补位
        dateY: year.toString(),  // 年份
        week: solar.getWeek(),  // 获取星期几
        lunardate: `${lunarResult.getYear()}年${lunarResult.getMonth()}月${lunarResult.getDay()}日`,  // 农历日期
        hseb: `${lunarResult.getYearInGanZhi()}年 ${lunarResult.getMonthInGanZhi()}月 ${lunarResult.getDayInGanZhi()}日`,  // 天干地支表示的日期
        text: text  // 随机诗句
    };

    // 设置响应头为JSON格式并返回数据
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json(response);
}
