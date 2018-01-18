export class titleModel {
    _id: string;
    name: string;
}

export class contactModel {
    title: titleModel = new titleModel();
    description: string;
    image: string;
}