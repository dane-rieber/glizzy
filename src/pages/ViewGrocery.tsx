import React, { useState } from 'react';
import { Grocery, getGrocery } from '../data/groceries';
import { RouteComponentProps } from "react-router";
import { IonPage, useIonViewWillEnter } from '@ionic/react';

interface ViewGroceryProps extends RouteComponentProps<{ id: string; }> { }

const ViewGrocery: React.FC<ViewGroceryProps> = ({ match }) => {

    const [grocery, setGrocery] = useState<Grocery>();

    useIonViewWillEnter(() => {
        const g = getGrocery(parseInt(match.params.id, 10));
        setGrocery(g);
    });

    return (
        <IonPage id="view-grocery-page">
            
        </IonPage>
    );
};

export default ViewGrocery;