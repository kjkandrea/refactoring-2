import invoicesJSON from './data/invoices.json'
import playsJSON from './data/plays.json'
import statementBefore from './statement.before'
import index from './statement'
import statementMy from './statement.my'

const [invoices] = JSON.parse(JSON.stringify(invoicesJSON));
const plays = JSON.parse(JSON.stringify(playsJSON));

describe('statementBefore 와 statement 는', () => {
  const before = statementBefore(invoices, plays);
  const after = index(invoices, plays)

  console.log(after)

  test('결과가 동일하다.', () =>
    expect(before).toEqual(after))
})

describe('statement 와 statementMy 는', () => {
  const after = index(invoices, plays)
  const my = statementMy(invoices, plays)

  test('결과가 동일하다.', () =>
    expect(after).toEqual(my))
})