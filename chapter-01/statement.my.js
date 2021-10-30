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

function getPoint (type, audienceCount) {
  const extraPoint = type === 'comedy' ? Math.max(audienceCount / 5, 0) : 0 // TODO
  const point = Math.max(audienceCount - 30, 0)
  return extraPoint + point
}

function getAmountTemplate (format, data) {
  return `${data.performanceName} : ${format(data.amount / 100)} (${data.audience}석)`
}

function statement (invoice, plays) {
  let totalAmount = 0
  let volumeCredits = 0

  const format = getUSDFormat()

  const amounts = invoice.performances.map(perf => {
    const { playID, audience } = perf
    const { type, name } = plays[playID]

    const amount = getDefaultAmountOfGenre(rateTable, type, audience)
    totalAmount += amount
    // 포인트를 적립한다.
    const point = getPoint(type, audience)
    volumeCredits += point

    return {
      performanceName: name,
      genre: type,
      audience,
      amount,
      point,
    }
  })

  return [
    `청구내역 (고객명: ${invoice.customer})`,
    ...amounts.map(({ performanceName, amount, audience }) =>
      getAmountTemplate(format, {
        performanceName,
        amount,
        audience,
      })
    ),
    `총액: ${format(totalAmount / 100)}`,
    `적립 포인트: ${volumeCredits}점\n`,
  ].join('\n')
}

function getUSDFormat () {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format
}

export default statement