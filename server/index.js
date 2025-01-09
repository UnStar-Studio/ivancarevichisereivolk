const express = require('express');
const Telegraf = require('node-telegram-bot-api');
const app = express();
const bodyParser = require('body-parser');

// Замените на ваш токен и ID чата
const botToken = '7943581542:AAHxM9QUlVdJlq7UZRGiDdSrfXEusgpUoJc';
const chatId = 7943581542;
const bot = new Telegraf(botToken);

app.use(bodyParser.json());

app.post('/sendImage', async (req, res) => {
    try {
        const imageData = req.body.image;
        const imageBuffer = Buffer.from(imageData.replace(/^data:image\/(png|jpeg);base64,/, ''), 'base64');
        await bot.telegram.sendPhoto(chatId, { source: imageBuffer });
        res.status(200).send('Фото успешно отправлено');
    } catch (error) {
        console.error('Ошибка на сервере:', error);
        res.status(500).send('Ошибка отправки фото');
    }
});


const port = process.env.PORT || 3000; // Используем порт 3000 или порт из переменной окружения
app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));
