export class CategoryListModel {
    title: string;
    items: Array<ItemCateModel>;
}

export class ItemCateModel {
    _id: string;
    name: string;
    rating: number;
    distance: number;
    isads: boolean;
    image: string;
}