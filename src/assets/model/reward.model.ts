export class RewardModel {
    coin: CoinModel = new CoinModel();
    conquest: ConquestModel = new ConquestModel();
}

export class CoinModel {
    coinnumber: number;
    image: string;
}

export class ConquestModel {
    name: string;
    image: string;
}