export default function GetProduct(data, id) {
  return data.find((item) => item.productId === id);
}
