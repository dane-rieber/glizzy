import MessageListItem from '../components/MessageListItem';
import React, { useState } from 'react';

import { Message, getMessages } from '../data/messages';
import {
  IonButton,
  IonToggle,
  IonContent,
  IonHeader,
  IonInput,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';

import './Home.css';
import { getGroceries, Grocery } from '../data/groceries';
import GroceryListItem from '../components/GroceryListItem';
import globals from '../data/globals';

const Home: React.FC = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [groceries, setGroceries] = useState<Grocery[]>([]);
  const [searchText, setSearchText] = useState<string>();

  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
    const gs = getGroceries();
    setGroceries(gs);
    globals.api.get('/lists', {headers: {Authorization: globals.token}})
        .then(res => {
            globals.api.get(`/list/${res.data[0]['id']}`, {headers: {Authorization: globals.token}})
              .then(res2 => {
                setGroceries((res2.data['groceries']));
              })
            
        })
        .catch(error => {

        });
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  //button functions:
  function light_dark_button_onClick() {
    alert('button is responsive');
  }

  function settings_onClick() {
    alert('button is responsive');
  }

  function add_item_onClick() {
    alert('button is responsive');
  }

  function sort_by_name_onClick() {
    alert('button is responsive');
  }

  function sort_by_store_onClick() {
    alert('button is responsive');
  }

  function sort_by_price_onClick() {
    alert('button is responsive');
  }

  //add features for sort buttons and light/dark mode
  
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Glizzy</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonInput value={searchText} placeholder="Search for Items" onIonChange={e => setSearchText(e.detail.value!)}></IonInput>


      <IonButton color="secondary" href="#" onClick={sort_by_name_onClick}>Sort by Name</IonButton>
      <IonButton color="secondary" href="#" onClick={sort_by_store_onClick}>Sort by Store</IonButton>
      <IonButton color="secondary" href="#" onClick={sort_by_price_onClick}>Sort by Price</IonButton>

        <IonList>
          {groceries.filter(g =>
            searchText === undefined ||
            g.name.toLowerCase().includes(searchText.toLowerCase()) ||
            g.store.toLowerCase().includes(searchText.toLowerCase())).sort((a, b) => a.name.localeCompare(b.name))
            .map(g => <GroceryListItem key={g.id} grocery={g} />)}
        </IonList>
        
        <IonButton color="primary" expand="full" href="#" onClick={add_item_onClick}>Add Item</IonButton>

        <IonButton color="tertiary" href="#" onClick={settings_onClick}>Settings</IonButton>

        <IonButton color="light" shape="round" href="#" onClick={light_dark_button_onClick}>Light/Dark Mode Toggle</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
