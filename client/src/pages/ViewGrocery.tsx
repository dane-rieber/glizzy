import React, { useState } from 'react';
import { Grocery, getGrocery } from '../data/groceries';
import { RouteComponentProps, useHistory } from "react-router";
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonItemDivider, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import globals from '../data/globals';
import './ViewGrocery.css';

interface ViewGroceryProps extends RouteComponentProps<{ id: string; }> { }

const ViewGrocery: React.FC<ViewGroceryProps> = ({ match }) => {

    const history = useHistory();

    const [grocery, setGrocery] = useState<Grocery>();

    const [name, setName] = useState<string>();
    const [price, setPrice] = useState<string>();
    const [quantity, setQuantity] = useState<string>();
    const [store_id, setStore_id] = useState<number>(1);

    useIonViewWillEnter(() => {
        if (match.params.id !== 'new') {
            const id = parseInt(match.params.id, 10);
            const g = getGrocery(id);
            setGrocery(g);

            globals.api.get(`/grocery/${id}`, { headers: { Authorization: globals.token } })
                .then(res => {
                    res.data['store'] = globals.stores.filter(s => s['id'] === res.data['store_id'])[0]['name'];
                    setGrocery(res.data);

                    setName(res.data.name);
                    setPrice(res.data.price);
                    setQuantity(res.data.quantity);
                    setStore_id(res.data.store_id);
                })
                .catch(err => console.log(err));
        }
    });

    const saveGrocery = () => {
        const data = {
            name: name ? name : grocery?.name,
            price: price ? price : grocery?.price,
            quantity: quantity ? parseInt(quantity) : grocery?.quantity,
            store_id: store_id ? store_id : grocery?.store_id
        }
        if (match.params.id === 'new') {
            globals.api.post(`/list/${globals.list_id}/add`, data, { headers: { Authorization: globals.token } })
                .catch(err => console.log(err));
                history.goBack();
        } else {
            globals.api.patch(`/grocery/${grocery?.id}`, data, { headers: { Authorization: globals.token } })
                .catch(err => console.log(err));
            history.goBack();
        }
    }

    const deleteGrocery = () => {
        globals.api.delete(`/grocery/${grocery?.id}`, { headers: { Authorization: globals.token } })
            .catch(err => console.log(err));
            history.goBack();
    }

    return (
        <IonPage id="view-grocery-page">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>View Grocery Item</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItemDivider>Name</IonItemDivider>
                    <IonItem className="formItem">
                        <IonInput value={name} onIonChange={e => setName(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItemDivider>Price</IonItemDivider>
                    <IonItem className="formItem">
                        <IonInput value={price} onIonChange={e => setPrice(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItemDivider>Quantity</IonItemDivider>
                    <IonItem className="formItem">
                        <IonInput value={quantity} onIonChange={e => setQuantity(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItemDivider>Store</IonItemDivider>
                    <IonItem>
                        <IonSelect value={store_id} onIonChange={e => setStore_id(e.detail.value!)}>
                            {globals.stores.map(store => <IonSelectOption value={store['id']}>{store['name']}</IonSelectOption>)}
                        </IonSelect>
                    </IonItem>
                </IonList>
                <IonButton color="primary" expand="block" onClick={saveGrocery}>Save</IonButton>
                <IonButton color="danger" expand="block" hidden={match.params.id === 'new'} onClick={deleteGrocery}>Delete</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default ViewGrocery;