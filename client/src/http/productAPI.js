import {$host} from "./index";

export const fetchProducts = async (ID_Category) => {
    const {data} = await $host.get('api/product', {params: {
        ID_Category
        }})
    return data
}