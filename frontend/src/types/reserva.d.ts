import {Car} from "./car";

export interface Reserva {
    _id?:string,
    vehicleId: Types.ObjectId;
    city?: string;
    address?: string;
    days: number;
    price: number;
    vehicle?:Car;
    startDate?:string;
}