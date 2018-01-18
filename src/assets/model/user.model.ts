export class UserModel {
    _id: string;
    displayName: string;
    username: string;
    password: string;
    fisrtName: string;
    lastName: string;
    gender: string;
    dateOfBirth: Date;
    citizenid: string;
    email: string;
    mobile: string;
    profileImageURL: string
    coin: number;
    notificationids: Array<string>;
    address: string;
    subdistrict: string;
    district: string;    
    province: string;
    postcode: number;
}