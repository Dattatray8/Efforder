export default function GetProductsViaCategory(data,category){
    return data.filter(item => {
        if(item.category === category){
            return item
        }
    })
}