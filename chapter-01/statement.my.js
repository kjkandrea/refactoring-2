const statement = (invoice, plays) => {
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

  const amounts = getAmounts(invoice, plays)

  return [
    `청구내역 (고객명: ${invoice.customer})`,
    ...amountTemplates(amounts),
    `총액: ${usd(totalAmount(amounts)/100)}`,
    `적립 포인트: ${totalPoint(amounts)}점\n`,
  ].join('\n')

  function getAmounts(invoice, plays) {
    return invoice.performances.map(({ playID, audience }) => {
      const { type: genre, name: performanceName } = plays[playID]

      return {
        performanceName,
        genre,
        audience,
        amount: getDefaultAmountOfGenre(rateTable, genre, audience),
        point: getPoint(genre, audience),
      }
    })
  }

  function getDefaultAmountOfGenre (rateTable, genre, audienceCount) {
    const { amount } = rateTable[genre]
    if (amount === undefined) {
      throw new Error(`알 수 없는 장르 : ${genre}`)
    }
    return amount + getExtraAmountOfAudience(rateTable, genre, audienceCount)
  }

  function getExtraAmountOfAudience (rateTable, genre, audienceCount) {
    const {
      extraAmountAudienceLimit,
      extraAmountOfAudienceOver,
      extraAmountOfAudience,
      extraAmount,
    } = rateTable[genre]
    if (extraAmountAudienceLimit >= audienceCount) return 0
    const audienceOverCountAmount = extraAmountOfAudienceOver *
      (audienceCount - extraAmountAudienceLimit)
    const audienceCountAmount = extraAmountOfAudience * audienceCount
    return extraAmount + audienceOverCountAmount + audienceCountAmount
  }

  function getPoint (genre, audienceCount) {
    const extraPoint = genre === 'comedy' ? Math.max(audienceCount / 5, 0) : 0 // TODO
    const point = Math.max(audienceCount - 30, 0)
    return extraPoint + point
  }

  function usd (number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(number)
  }

  function amountTemplates (amounts) {
    return amounts.map(({ performanceName, amount, audience }) =>
      `${performanceName} : ${usd(amount / 100)} (${audience}석)`)
  }
  function totalAmount (amounts) {
    return amounts.map(({ amount }) => amount).reduce((a, b) => a + b);
  }
  function totalPoint (amounts) {
    return amounts.map(({ point }) => point).reduce((a, b) => a + b)
  }
}

export default statement