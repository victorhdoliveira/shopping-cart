const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test('Verifica se o método localStorage.getItam é chamado', () => {
    getSavedCartItems('MLB1615760527')
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  test('Verifica se o método localStorage.getItam é chamado com os parâmetros correspondetes', () => {
    getSavedCartItems('MLB1615760527')
    expect(localStorage.getItem).toBeCalledWith('MLB1615760527');
  });
});
