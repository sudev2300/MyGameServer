// server.js — للتشغيل المحلي فقط
const app = require("./index");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running locally on http://localhost:${PORT}`);
});