import { ItemCategoriyModel } from "./category-master.model";


export class ItemShopModel {
    _id: string;
    name: string
    reviews: number;
    image: string;
}

export class ItemShopModelMock {
    _id: string;
    name: string
    rating: number;
    distance: number;
    image: string;
    isAds: boolean;
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
    products: Array<ProductModel>;
}

export class ProductModel {
    title: string;
    items: Array<ItemProductModel>
}

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