export default function GetRandomProducts(data, cnt = 4) {
  const shuffedData = [...data].sort(() => 0.5 - Math.random());
  return shuffedData.slice(0, cnt);
}
