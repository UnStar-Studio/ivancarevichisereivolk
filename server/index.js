const express = require('express');
const Telegraf = require('node-telegram-bot-api');
const app = express();
const bodyParser = require('body-parser');

// �������� �� ��� ����� � ID ����
const botToken = '7943581542:AAHxM9QUlVdJlq7UZRGiDdSrfXEusgpUoJc';
const chatId = 7943581542;
const bot = new Telegraf(botToken);

app.use(bodyParser.json());

app.post('/sendImage', async (req, res) => {
    try {
        const imageData = req.body.image;
        const imageBuffer = Buffer.from(imageData.replace(/^data:image\/(png|jpeg);base64,/, ''), 'base64');
        await bot.telegram.sendPhoto(chatId, { source: imageBuffer });
        res.status(200).send('���� ������� ����������');
    } catch (error) {
        console.error('������ �� �������:', error);
        res.status(500).send('������ �������� ����');
    }
});


const port = process.env.PORT || 3000; // ���������� ���� 3000 ��� ���� �� ���������� ���������
app.listen(port, () => console.log(`������ ������� �� ����� ${port}`));
