import { ItemCategoriyModel } from "./category-master.model";
import { ItemHotpricesModel } from "./hotprice.model";
import { ItemShopModel } from "./shop.model";

export class HomeModel {
    ads: AdsModel = new AdsModel();
    hotprices: HotpricesModel = new HotpricesModel();
    categories: CategoriesModel = new CategoriesModel();
    shops: Array<ShopModel> = [];
}

export class HotpricesModel {
    title: string;
    items1: Array<HotpriceModel>;
    items2: Array<HotpriceModel>;
}

export class AdsModel {
    title: string;
    items: Array<ItemAdsModel>;
}

export class ItemAdsModel {
    _id: string;
    image: string;
    name: string;
    description: string;
    website: string;
    videoid: string;
    isvideo: boolean;
}

export class HotpriceModel {
    title: string;
    items: Array<ItemHotpricesModel>;
}

export class CategoriesModel {
    title: string;
    items: Array<ItemCategoriyModel>;
}

export class ShopModel {
    title: string;
    items: Array<ItemShopModel> = [];
}

