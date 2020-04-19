export default function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  return renderPlainText(statementData, plays);

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let result = 0;
    switch (aPerformance.play.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
    }
    return result;
  }
}

function renderPlainText(data, plays) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;
  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${usd(perf.amount / 100)} (${
      perf.audiences
    }석)\n`;
  }

  let volumeCredits = totalVolumeCredits();

  result += `총액: ${usd(totalAmount() / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;

  function totalAmount() {
    let result = 0;
    for (let perf of data.performances) {
      result += perf.amount;
    }
    return result;
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of data.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimunFractionDigits: 2,
    }).format(aNumber);
  }

  function volumeCreditsFor(perf) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    if ("comedy" === perf.play.type) result += Math.floor(perf.audience / 5);
    return result;
  }
}
