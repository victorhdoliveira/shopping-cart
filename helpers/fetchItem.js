const fetchItem = async (id) => {
  try {
  const endpoint = `https://api.mercadolibre.com/items/${id}`;
  const request = await fetch(endpoint);
  const itemData = await request.json();
  return itemData;
  } catch (error) {
    return 'You must provide an url';
}
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
