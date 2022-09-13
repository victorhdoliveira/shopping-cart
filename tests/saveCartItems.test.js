const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test('Verifica se o método localStorage.setItem é chamado', () => {
    saveCartItems('MLB1615760527')
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  test('Verifica se localStorage.setItem é chamado com os parâmetros correspondetes', () => {
    saveCartItems('MLB1615760527');
    expect(localStorage.setItem).toBeCalledWith('cartItems', 'MLB1615760527');
  });
});
