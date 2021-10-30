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

function getPoint(type, audienceCount) {
  const extraPoint = type === 'comedy' ? Math.max(audienceCount / 5, 0) : 0 // TODO
  const point = Math.max(audienceCount - 30, 0);
  return extraPoint + point
}

function getAmountTemplate(format, data) {
  return `${data.name} : ${format(data.amount / 100)} (${data.audience}석)\n`;
}

function statement (invoice, plays) {
  let totalAmount = 0
  let volumeCredits = 0
  let result = `청구내역 (고객명: ${invoice.customer})\n`

  const format = getUSDFormat()

  invoice.performances.forEach(perf => {
    const { type, name } = plays[perf.playID]

    const amount = getDefaultAmountOfGenre(rateTable, type, perf.audience)
    // 포인트를 적립한다.
    volumeCredits += getPoint(type, perf.audience)

    result += getAmountTemplate(format, {
      name,
      amount,
      audience: perf.audience
    })
    totalAmount += amount
  })

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