import React from 'react';
import {
  IonItem,
  IonLabel,
  IonNote
  } from '@ionic/react';
import { Grocery } from '../data/groceries';
import './GroceryListItem.css';

interface GroceryListItemProps {
    grocery: Grocery;
}

const GroceryListItem: React.FC<GroceryListItemProps> = ({ grocery }) => {
    return (
        <IonItem routerLink={`/grocery/${grocery.id}`} detail={false}>
            <IonLabel className="ion-text-wrap">
                <h2>
                    {grocery.quantity}: {grocery.name}
                    <span className="date">
                        <IonNote>${grocery.price} x {grocery.quantity}</IonNote>
                    </span>
                </h2>
                <h3>{grocery.store}</h3>
            </IonLabel>
        </IonItem>
    );
};

export default GroceryListItem;