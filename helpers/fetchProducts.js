const fetchProducts = async (product) => {
  try {
    const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const request = await fetch(endpoint);
    const data = await request.json();
    return data;
  } catch (error) {
    return new Error('You must provide an url');
}
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
