const rateTable = {
  tragedy: {
    amount: 40000,
    extraAmountAudienceLimit: 30,
    extraAmountOfAudienceOver: 1000,
    extraAmountOfAudience: 0,
    extraAmount: 0,
  },
  comedy: {
    amount: 30000,
    extraAmountAudienceLimit: 20,
    extraAmountOfAudienceOver: 500,
    extraAmountOfAudience: 300,
    extraAmount: 10000,
  },
}

function getDefaultAmountOfGenre (rateTable, genre, audienceCount) {
  const { amount } = rateTable[genre]
  if (amount === undefined) {
    throw new Error(`알 수 없는 장르 : ${genre}`)
  }
  return amount + getextraAmountOfAudience(rateTable, genre, audienceCount)
}

function getextraAmountOfAudience (rateTable, genre, audienceCount) {
  const {
    extraAmountAudienceLimit,
    extraAmountOfAudienceOver,
    extraAmountOfAudience,
    extraAmount,
  } = rateTable[genre]
  if (extraAmountAudienceLimit >= audienceCount) {
    return 0
  }
  const audienceOverCountAmount = extraAmountOfAudienceOver *
    (audienceCount - extraAmountAudienceLimit)
  const audienceCountAmount = extraAmountOfAudience * audienceCount
  return extraAmount + audienceOverCountAmount + audienceCountAmount
}

function getPoint(audienceCount) {
  return Math.max(audienceCount - 30, 0);
}

function statement (invoice, plays) {
  let totalAmount = 0
  let volumeCredits = 0
  let result = `청구내역 (고객명: ${invoice.customer})\n`

  const format = getUSDFormat()

  for (let perf of invoice.performances) {
    const { type, name } = plays[perf.playID]

    const thisAmount = getDefaultAmountOfGenre(rateTable, type, perf.audience)

    // 포인트를 적립한다.
    volumeCredits += getPoint(perf.audience)

    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ('comedy' === type) {
      volumeCredits += Math.floor(perf.audience / 5)
    }

    result += `${name} : ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`
    totalAmount += thisAmount
  }

  result += `총액: ${format(totalAmount / 100)}\n`
  result += `적립 포인트: ${volumeCredits}점\n`

  return result
}

function getUSDFormat () {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format
}

export default statement