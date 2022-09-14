require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  test('Verifica se fecth é chamada', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  });
  test('Verifica o retorno da função com MLB1615760527 de argumento', async () => {
    await fetchItem('MLB1615760527')
    const expectedUrl = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toBeCalledWith(expectedUrl);
  });
  test('Verifica se o retorno de fetchItem(MLB1615760527) é igual ao objeto item', async () => {
    const compare = await fetchItem('MLB1615760527')
    expect(compare).toEqual(item);
  });
  test('Verifica se a mensagem de erro é apropriada, quando a função não receber parâmetro', async () => {
    const emptyFunction = await fetchItem()
    expect(emptyFunction).toEqual(new Error('You must provide an url'));
  });
});
