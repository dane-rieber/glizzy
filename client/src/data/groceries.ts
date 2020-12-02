import Axios from "axios";
import globals from "./globals";

export interface Grocery {
    id: number;
    name: string;
    price: string;
    quantity: number;
    store_id: number;
    store: string;
    active: boolean;
}

const groceries: Grocery[] = [
];

export const getGroceries = () => groceries;

export const getGrocery = (id: number) => groceries.find(g => g.id === id);