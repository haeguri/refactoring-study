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

function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
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

  function volumeCreditsFor(perf) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    if ("comedy" === perf.play.type) result += Math.floor(perf.audience / 5);
    return result;
  }

  function totalAmount(data) {
    return data.performances.reduce((total, perf) => (total += perf.amount), 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce(
      (total, perf) => (total += perf.volumeCredits),
      0
    );
  }
}
