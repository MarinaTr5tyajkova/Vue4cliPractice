const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); 

app.post('/api-shop/order', (req, res) => {
  try {
    const cartData = req.body;
    res.status(201).json({ data: { order_id: 1, message: 'Заказ оформлен успешно' } });
  } catch (error) {
    res.status(500).json({ error: { message: 'Ошибка при оформлении заказа' } });
  }
});


const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порте ${port}`);
});
