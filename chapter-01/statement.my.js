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

function statement (invoice, plays) {
  const amounts = invoice.performances.map(({ playID, audience }) => {
    const { type, name } = plays[playID]

    return {
      performanceName: name,
      genre: type,
      audience,
      amount: getDefaultAmountOfGenre(rateTable, type, audience),
      point: getPoint(type, audience),
    }
  })

  const amountTemplates = amounts.map(({ performanceName, amount, audience }) =>
    `${performanceName} : ${USDFormat(amount / 100)} (${audience}석)`)
  const totalAmount = amounts.map(({ amount }) => amount).reduce((a, b) => a + b)
  const totalPoint = amounts.map(({ point }) => point).reduce((a, b) => a + b)

  return [
    `청구내역 (고객명: ${invoice.customer})`,
    ...amountTemplates,
    `총액: ${USDFormat(totalAmount/100)}`,
    `적립 포인트: ${totalPoint}점\n`,
  ].join('\n')
}

function USDFormat (number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(number)
}

export default statement