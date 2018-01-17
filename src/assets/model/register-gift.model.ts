export class RegisterGiftModel{
    newregisterreward:NewregisterrewardModel = new NewregisterrewardModel()
}
export class NewregisterrewardModel{
    items:Array<itemsModel>
}
export class itemsModel{
    description:string;
    image:string;
}