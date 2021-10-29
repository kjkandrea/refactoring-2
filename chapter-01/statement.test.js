import invoicesJSON from './data/invoices.json'
import playsJSON from './data/plays.json'
import statement from './statement.before'

const [invoices] = JSON.parse(JSON.stringify(invoicesJSON));
const plays = JSON.parse(JSON.stringify(playsJSON));

console.log(statement(invoices, plays))


describe('', () => {
  test('크아아아', () => expect([1, 2].reduce((a, b) => a + b)).toBe(3))

  test('import도 할거다!!!', () => expect(invoices).toBeTruthy())
})