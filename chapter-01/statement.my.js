const rateTable = {
  tragedy: {
    amount: 40000,
    extraAmountAudienceCountLimit: 30,
    extraAmountOfAudienceOverCount: 1000,
    extraAmountOfAudienceCount: 0,
    extraAmount: 0,
  },
  comedy: {
    amount: 30000,
    extraAmountAudienceCountLimit: 20,
    extraAmountOfAudienceOverCount: 500,
    extraAmountOfAudienceCount: 300,
    extraAmount: 10000,
  },
}

function getDefaultAmountOfGenre (rateTable, genre, audienceCount) {
  const { amount } = rateTable[genre]
  if (amount === undefined) {
    throw new Error(`알 수 없는 장르 : ${genre}`)
  }
  return amount + getExtraAmountOfAudienceCount(rateTable, genre, audienceCount)
}

function getExtraAmountOfAudienceCount (rateTable, genre, audienceCount) {
  const {
    extraAmountAudienceCountLimit,
    extraAmountOfAudienceOverCount,
    extraAmountOfAudienceCount,
    extraAmount,
  } = rateTable[genre]
  if (extraAmountAudienceCountLimit >= audienceCount) {
    return 0
  }
  const audienceOverCountAmount = extraAmountOfAudienceOverCount *
    (audienceCount - extraAmountAudienceCountLimit)
  const audienceCountAmount = extraAmountOfAudienceCount * audienceCount
  return extraAmount + audienceOverCountAmount + audienceCountAmount
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
    volumeCredits += Math.max(perf.audience - 30, 0)

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