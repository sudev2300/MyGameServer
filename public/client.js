// يتصل بنفس الدومين/البورت اللي السيرفر شغّال عليه في Replit
const socket = io(); // same-origin

const $balance = document.getElementById("balance");
const $result  = document.getElementById("result");
const $log     = document.getElementById("log");

function log(msg) {
  const p = document.createElement("p");
  p.textContent = msg;
  $log.prepend(p);
}

// أول حالة
socket.on("state", (state) => {
  $balance.textContent = state.balance;
});

socket.on("spin_result", (res) => {
  const txt =
    `🎯 النتيجة: ${res.rolled} (${res.color}) | ` +
    `رهان: ${res.bet.kind === "color" ? res.bet.choice : res.bet.choice} بمبلغ ${res.bet.amount} | ` +
    `المكسب: ${res.win} | الرصيد: ${res.balance}`;
  $result.textContent = txt;
  $balance.textContent = res.balance;
  log(txt);
});

socket.on("error_msg", (m) => {
  alert(m);
});

// أزرار
document.getElementById("refresh").onclick = () => socket.emit("get_balance");

document.getElementById("betColor").onclick = () => {
  const choice = document.getElementById("color").value;
  const amount = Number(document.getElementById("amountColor").value);
  socket.emit("place_bet", { kind: "color", choice, amount });
};

document.getElementById("betNumber").onclick = () => {
  const choice = Number(document.getElementById("number").value);
  const amount = Number(document.getElementById("amountNumber").value);
  socket.emit("place_bet", { kind: "number", choice, amount });
};