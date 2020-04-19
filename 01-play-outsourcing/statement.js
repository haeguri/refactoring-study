import createStatementData from "./createStatementData.js";

export default function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;
  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${usd(perf.amount / 100)} (${
      perf.audiences
    }석)\n`;
  }

  let volumeCredits = data.totalVolumeCredits;

  result += `총액: ${usd(data.totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimunFractionDigits: 2,
    }).format(aNumber);
  }
}
