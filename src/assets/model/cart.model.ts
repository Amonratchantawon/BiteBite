export class CartModel {
    shop: ShopModel = new ShopModel();
    items: Array<ItemCartModel>;
    qty: number;
    amount: number;
}

export class ItemCartModel {
    product: ProductCartModel = new ProductCartModel();
    remark: string;
    qty: number;
    amount: number;
}

export class ProductCartModel {
    name: string;
    price: number;
}

export class ShopModel {
    _id: string;
    name: string;
    detail: string;
    address: AddressCartModel = new AddressCartModel();
}

export class AddressCartModel {
    address: string;
    district: string;
    subdistrict: string;
    province: string;
    postcode: string;
    remark: string;
}