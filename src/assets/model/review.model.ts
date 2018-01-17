import { UserModel } from "./user.model";


export class ReviewModel {
    user: UserModel = new UserModel();
    image: string;
    title: string;
    description: string;
    created: Date;
    islike: Boolean;
    countlike: number;
}