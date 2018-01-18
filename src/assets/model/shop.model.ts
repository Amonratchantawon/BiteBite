import { ItemCategoriyModel } from "./category-master.model";


export class ItemShopModel {
    _id: string;
    name: string
    reviews: number;
    image: string;
}

// ShopCenterModel

export class ShopModel {
    _id: string;
    coverimage: string;
    name: string;
    detail: string;
    isopen: boolean;
    promoteimage: Array<Promoteimage>
    address: AddressModel = new AddressModel();
    categories: Array<ItemCategoriyModel>;
    products: Array<ItemProductModel>;
}

// export class ProductModel{
//         title:string;
//         items: Array<ItemProductModel>
// }

export class ItemProductModel {
    _id: string;
    cateid: string;
    name: string;
    image: string;
    price: number;
    ispromotion: boolean;
    popularcount: number;
    isrecommend: boolean;
}

export class AddressModel {
    addressdetail: string;
}

export class Promoteimage {
    url: string;
}