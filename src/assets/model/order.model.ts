import { ShopCartModel, ItemCartModel } from "./cart.model";

export class OrderModel {
    _id: string;
    shop: ShopCartModel = new ShopCartModel();
    items: Array<ItemCartModel>;
    shippingAddress: ShippingAddressModel = new ShippingAddressModel();
    coupon: CouponModel = new CouponModel();
    payment: PaymentModel = new PaymentModel();
    estimateprice: EstimatePriceModel = new EstimatePriceModel();
    omiseToken: string;
    qty: number;
    amount: number;
    netamount: number;
    discount: number;
    distance: number;
}

export class ShippingAddressModel {
    name: string;
    tel: string;
    address: string;
    addressDetail: string;
    location: LocationModel = new LocationModel();
}

export class LocationModel {
    lat: number;
    lng: number;
}

export class CouponModel {
    code: string;
    discount: number;
}

export class PaymentModel {
    paymenttype: string;
    creditno: string;
    creditname: string;
    expdate: string;
    creditcvc: string;
}

export class EstimatePriceModel {
    tripDuration: number;
    normalPrice: number;
    netPrice: number;
    discount: number;
    distance: number;
    responseCode: string;
    responseDesc: string;
}