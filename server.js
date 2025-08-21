const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// تخزين الرصيد مؤقتًا (في ذاكرة السيرفر) — في الحقيقة هيتعمل DB
let balance = 1000;

// مثال على رهانات
let bets = [];

// Endpoint: رصيد اللاعب
app.get("/balance", (req, res) => {
  res.json({ balance });
});

// Endpoint: إضافة رهان
app.post("/bet", (req, res) => {
  const { amount, type } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid bet amount" });
  }

  if (amount > balance) {
    return res.status(400).json({ message: "Not enough balance" });
  }

  // خصم الرهان
  balance -= amount;

  // حفظ الرهان
  bets.push({ amount, type });

  res.json({ message: "Bet placed", balance });
});

// Endpoint: نتيجة الجولة (توزيع الأرباح)
app.post("/result", (req, res) => {
  const { winningType } = req.body; // مثلا "black" أو "even" أو "7"

  let winnings = 0;

  bets.forEach((bet) => {
    if (bet.type === winningType) {
      // هنا نسبة الأرباح (مثال بسيط ×2)
      winnings += bet.amount * 2;
    }
  });

  // تحديث الرصيد
  balance += winnings;

  // تصفير الرهانات للجولة الجديدة
  bets = [];

  res.json({ message: "Round finished", balance, winnings });
});

// Endpoint: أسماء الفائزين (قائمة ديناميكية)
app.get("/winners", (req, res) => {
  // مثال عشوائي — في الحقيقة هتسحب من DB
  const winners = [
    { name: "Mahmoud", win: 200 },
    { name: "Sara", win: 500 },
    { name: "Ali", win: 100 }
  ];

  res.json({ winners });
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});