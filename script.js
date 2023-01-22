const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};
 
 const itemsClass = document.querySelector('.items');
 const productsData = document.querySelector('.cart__items');
 const totalPrice = document.createElement('div');

const getItemsPrice = () => {
  const cart = document.querySelector('.cart');
  const itensCart = document.querySelectorAll('.cart__item');
  let sum = 0;
  itensCart.forEach((item) => {
  const prices = Number(item.innerText.split('$')[1]);
  sum += prices;
  });

  totalPrice.className = 'total-price';
  totalPrice.innerHTML = `Total: R$ ${sum.toFixed(2)}`;
  cart.appendChild(totalPrice);
  };

const createCartItemElement = ({ title, price, thumbnail }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `${title} 
  R$ ${price}`;
  li.appendChild(createProductImageElement(thumbnail));
  li.addEventListener('click', (event) => {
    event.target.remove();
    getItemsPrice();
  });
  return li;
};

const loading = () => {
  const phrase = document.createElement('div');
  phrase.className = 'loading';
  phrase.innerText = 'carregando...';
  itemsClass.appendChild(phrase);
  };

const takeOutLoading = () => {
  const toCharge = document.querySelector('.loading');
  toCharge.remove();
};

const productsList = async () => {
  const fromFunction = await fetchProducts('salgadinho');
  const { results } = fromFunction;
  results.forEach((result) => {
    const { id, title, thumbnail, price } = result;
    itemsClass.appendChild(createProductItemElement({
      id, title, thumbnail, price,
  }));
    });
};

const addItemToCart = async () => {
  loading();
  await productsList();
  const buttons = document.querySelectorAll('.item__add');
    buttons.forEach((btn) => {
      btn.addEventListener('click', async (event) => {
      const productId = event.target.parentNode.firstChild.innerText;
      const itemData = await fetchItem(productId);  
      productsData.appendChild(createCartItemElement(itemData));
      saveCartItems(productsData.innerHTML);
      getItemsPrice();
    });
}); 
    takeOutLoading();
};

const cartCleaner = () => {
  const btnCleaner = document.querySelector('.empty-cart');
  btnCleaner.addEventListener('click', () => {
    productsData.innerHTML = '';
    getItemsPrice();
  });
};

const getItem = () => {
  const cartItens = getSavedCartItems();
  productsData.innerHTML = cartItens;
  getItemsPrice();
};

const removeItensFromCart = async () => {
  const itens = document.querySelectorAll('.cart__item');
  itens.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.target.remove();
      getItemsPrice();
  });
});
};

window.onload = () => { 
  addItemToCart();
  cartCleaner();
  getItem();
  removeItensFromCart();
};
