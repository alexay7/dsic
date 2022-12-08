import {Car} from "./car";

export interface Reserva {
    vehicleId: Types.ObjectId;
    city?: string;
    address?: string;
    days: number;
    price: number;
    vehicle?:Car;
}