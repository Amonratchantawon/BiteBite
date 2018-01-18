export class RewardModel {
    coin: CoinModel = new CoinModel();
    conquest: ConquestModel = new ConquestModel();
    MakeMerit: MakeMeritModel = new MakeMeritModel();
    sendCoin: SendCoinModel = new SendCoinModel();
    giftAndVouCher:GiftAndVouCherModel = new GiftAndVouCherModel();
}

export class CoinModel {
    coinnumber: number;
    image: string;
}

export class ConquestModel {
    name: string;
    image: string;
}

export class MakeMeritModel {
    title: string;
    items: Array<ItemsMakeMeritModel>;
}

export class ItemsMakeMeritModel {
    image: string;
}

export class SendCoinModel {

    title: string;
    items: Array<ItemSendCoinModel>;

}

export class ItemSendCoinModel {
    name: string;
    image: string;
}

export class GiftAndVouCherModel {
    title: string;
    items: Array<ItemGiftAndVouCherModel>;
}

export class ItemGiftAndVouCherModel {
    name: string;
    image: string;
}