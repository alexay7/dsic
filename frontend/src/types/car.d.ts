export interface Car {
    _id?:string;
    type: string;
    brand: string;
    model: string;
    year: number;
    location: string;
    imageUrl: string;
    price:number;
    available:boolean;
    energy:string;
}