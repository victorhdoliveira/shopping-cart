require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  test('Verifica se fecth é chamada', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  });
  test('Verifica o retorno da função com computador de argumento', async () => {
    await fetchProducts('computador')
    const expectedUrl = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toBeCalledWith(expectedUrl);
  });
  test('Verifica se o retorno de fetchProducts(computador) é igual ao objeto computadorSearch', async () => {
    const compare = await fetchProducts('computador')
    expect(compare).toEqual(computadorSearch);
  });
  test('Verifica se a mensagem de erro é apropriada, quando a função não receber parâmetro', async () => {
    const emptyFunction = await fetchProducts()
    expect(emptyFunction).toEqual(new Error('You must provide an url'));
  });
});
