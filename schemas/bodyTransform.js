module.exports = (body) => {
  if (Array.isArray(body)) {
    const salesList = body.map(({ productId, quantity }) => (
      {
        productId,
        quantity,
      }
    ));
    return salesList;
  } 
    return { err: 'Wrong fields', code: 400 };
};
