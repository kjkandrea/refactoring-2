import invoicesJSON from './data/invoices.json'
import playsJSON from './data/plays.json'
import statementBefore from './statement.before'
import statement from './statement'

const [invoices] = JSON.parse(JSON.stringify(invoicesJSON));
const plays = JSON.parse(JSON.stringify(playsJSON));

describe('statementBefore 와 statement 는', () => {
  const before = statementBefore(invoices, plays);
  const after = statement(invoices, plays)

  test('결과가 동일하다.', () =>
    expect(before).toEqual(after))

  console.log(after)
})