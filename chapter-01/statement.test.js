import invoices from './data/invoices.json'


describe('나도 테스트 짜볼래', () => {
  test('크아아아', () => expect([1, 2].reduce((a, b) => a + b)).toBe(3))

  test('import도 할거다!!!', () => expect(invoices).toBeTruthy())
})