export default function SearchProduct(data,query){
    return data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
}