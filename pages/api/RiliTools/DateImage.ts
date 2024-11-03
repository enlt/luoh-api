import fs from 'fs';
import path from 'path';
import axios from 'axios';
import sharp from 'sharp';
import { createCanvas, loadImage, registerFont } from 'canvas';
import os from 'os';
import type { NextApiRequest, NextApiResponse } from 'next';

// 远程字体文件和图片链接的 URL
const FONT_URL = 'https://api.luoh-an.me/storage/ttf/font.ttf';
const IMAGE_TXT_URL = 'https://cdn.s3.luoh-an.me/luoh-an-api/daysign/images/images.txt';
const TEMP_DIR = os.tmpdir(); // 获取系统临时文件目录
const FONT_FILE = 'DateImageFont.ttf'; // 本地存储字体的文件名

// 确保字体文件存在，如果不存在则下载
async function ensureFontExists(): Promise<string> {
    const tempFontPath = path.join(TEMP_DIR, FONT_FILE); // 本地字体文件路径
    if (!fs.existsSync(tempFontPath)) {
        try {
            // 下载字体并保存
            const fontResponse = await axios.get(FONT_URL, { responseType: 'arraybuffer' });
            fs.writeFileSync(tempFontPath, Buffer.from(fontResponse.data));
        } catch (error) {
            throw new Error('字体文件下载失败，请检查字体文件的URL或网络连接');
        }
    }
    return tempFontPath;
}

// 使用 sharp 库调整图片尺寸
async function resizeImage(imagePath: string, newWidth: number, newHeight: number): Promise<string> {
    const newImagePath = imagePath.replace(/(\.[\w\d]+)$/, '_resized$1'); // 生成新的文件名
    try {
        await sharp(imagePath).resize(newWidth, newHeight).toFile(newImagePath); // 调整尺寸并保存
    } catch (error) {
        throw new Error('图片尺寸调整失败，请检查图片文件路径或格式');
    }
    return newImagePath;
}

// 在图片上添加文本
async function addTextToImage(
    imagePath: string,
    textParams: Array<{ text: string, size: number, position: string, positionsite: number, x_offset: number, color: number[] }>
) {
    try {
        const image = await loadImage(imagePath);
        const canvas = createCanvas(image.width, image.height); // 创建画布
        const ctx = canvas.getContext('2d');

        ctx.drawImage(image, 0, 0); // 绘制原始图片

        const fontPath = await ensureFontExists(); // 确保字体文件存在
        registerFont(fontPath, { family: 'DateImageFont' }); // 注册字体

        textParams.forEach(textParam => {
            const { text, size, position, positionsite, x_offset, color } = textParam;
            ctx.font = `${size}px "DateImageFont"`; // 设置字体样式
            ctx.fillStyle = `rgb(${color.join(',')})`; // 设置字体颜色

            const textWidth = ctx.measureText(text).width;
            let x = x_offset < 0 ? -x_offset : (x_offset > 0 ? canvas.width - textWidth - x_offset : (canvas.width - textWidth) / 2); // 计算 X 坐标

            let y: number;
            switch (position) {
                case 'top':
                    y = positionsite;
                    break;
                case 'middle':
                    y = (canvas.height / 2) + (size / 2);
                    break;
                case 'bottom':
                default:
                    y = canvas.height - positionsite;
                    break;
            }

            ctx.fillText(text, x, y); // 在图片上绘制文字
        });

        const buffer = canvas.toBuffer('image/jpeg');
        fs.writeFileSync(imagePath, buffer); // 保存最终图片
    } catch (error) {
        throw new Error('在图片上添加文本时出错，请检查文本参数和图片路径');
    }
}

// 获取远程图片链接列表
async function getImageLinks(): Promise<string[]> {
    try {
        const response = await axios.get(IMAGE_TXT_URL);
        return response.data.split('\n').filter(Boolean); // 解析文本中的图片链接
    } catch (error) {
        if (error instanceof Error) {
            console.error('获取远程图片链接失败:', error.message);
        } else {
            console.error('未知错误');
        }
        return []; // 在发生错误时返回一个空数组
    }
}

// API 路由处理函数
export default async (req: NextApiRequest, res: NextApiResponse) => {
    // 设置跨域头部，允许所有域名访问
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    try {
        const day = await axios.get("https://api.luoh-an.me/RiliTools/DateInfo").then(res => res.data);

        // 准备要添加到图片的文本参数
        const textParams = [
            {
                text: day.dateD,
                size: 245,
                position: 'bottom',
                positionsite: 700,
                x_offset: -80,
                color: [255, 255, 255]
            },
            {
                text: `${day.dateMC}月 ${day.dateY}`,
                size: 65,
                position: 'bottom',
                positionsite: 590,
                x_offset: -80,
                color: [255, 255, 255]
            },
            {
                text: day.hseb,
                size: 65,
                position: 'bottom',
                positionsite: 510,
                x_offset: -80,
                color: [255, 255, 255]
            }
        ];

        const text = day.text.length > 21 ? [
            { text: day.text.substring(0, 21), size: 50, position: 'bottom', positionsite: 300, x_offset: -80, color: [255, 255, 255] },
            { text: day.text.substring(21), size: 50, position: 'bottom', positionsite: 250, x_offset: -30, color: [255, 255, 255] }
        ] : [
            { text: day.text, size: 50, position: 'bottom', positionsite: 300, x_offset: -80, color: [255, 255, 255] }
        ];

        const allTextParams = [...textParams, ...text]; // 合并所有文本参数

        // 获取远程图片链接并随机选择一张
        const imageLinks = await getImageLinks();
        const randomImageLink = imageLinks[Math.floor(Math.random() * imageLinks.length)];

        // 下载并保存图片
        const imageResponse = await axios.get(randomImageLink, { responseType: 'arraybuffer' });
        const imagePath = path.join(TEMP_DIR, 'randomImage.jpg');
        fs.writeFileSync(imagePath, Buffer.from(imageResponse.data));

        // 调整图片大小并添加文本
        const resizedImagePath = await resizeImage(imagePath, 1080, 1277);
        await addTextToImage(resizedImagePath, allTextParams);

        // 读取并返回最终图片
        const finalImage = fs.readFileSync(resizedImagePath);
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(finalImage);
    } catch (error) {
        const errMessage = (error instanceof Error) ? error.message : '未知错误';
        console.error(errMessage);
        res.status(500).json({ error: `处理图片时发生错误：${errMessage}` });
    }
};
