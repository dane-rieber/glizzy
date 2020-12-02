import React from 'react';
import {
    IonCheckbox,
    IonItem,
    IonLabel,
    IonNote
} from '@ionic/react';
import { Grocery } from '../data/groceries';
import './GroceryListItem.css';
import '../data/globals';
import globals from '../data/globals';

interface GroceryListItemProps {
    grocery: Grocery;
}

const GroceryListItem: React.FC<GroceryListItemProps> = ({ grocery }) => {
    const setActive = (active: boolean) => {
        grocery.active = active;
        globals.api.patch(`/grocery/${grocery.id}`, {active: active}, {headers: {Authorization: globals.token}})
            .catch(err => console.log(err));
    }

    return (
        <IonItem detail={false} className="outer">
            <IonCheckbox checked={!grocery.active} onIonChange={e => setActive(!e.detail.checked)}></IonCheckbox>
            <IonItem routerLink={`/grocery/${grocery.id}`} detail={false} className="inner">
                <IonLabel className="ion-text-wrap">
                    <h2>
                        {grocery.name}
                        <span className="date">
                            <IonNote>{grocery.price} x {grocery.quantity}</IonNote>
                        </span>
                    </h2>
                    <h3>{grocery.store}</h3>
                </IonLabel>
            </IonItem>
        </IonItem>
    );
};

export default GroceryListItem;