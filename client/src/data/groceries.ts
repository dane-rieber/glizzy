import Axios from "axios";
import globals from "./globals";

export interface Grocery {
    id: number;
    name: string;
    price: number;
    quantity: number;
    store: string;
}

const groceries: Grocery[] = [
    {
        id: 0,
        name: "Eggs",
        price: 10.00,
        quantity: 3,
        store: "Target"
    },
    {
        id: 1,
        name: "Pancakes",
        price: 10.00,
        quantity: 3,
        store: "Walmart"
    },
    {
        id: 2,
        name: "Bacon",
        price: 10.00,
        quantity: 3,
        store: "Target"
    },
    {
        id: 3,
        name: "Water",
        price: 10.00,
        quantity: 3,
        store: "Target"
    },
    {
        id: 4,
        name: "Tuna",
        price: 10.00,
        quantity: 3,
        store: "Target"
    }
];

export const getGroceries = () => groceries;

export const getGrocery = (id: number) => groceries.find(g => g.id === id);