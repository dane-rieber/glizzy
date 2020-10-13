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

const Home: React.FC = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [groceries, setGroceries] = useState<Grocery[]>([]);
  const [searchText, setSearchText] = useState<string>();

  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
    const gs = getGroceries();
    setGroceries(gs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };


  //buttons:

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


      <IonButton color="secondary" href="#">Sort by Name</IonButton>
      <IonButton color="secondary" href="#">Sort by Store</IonButton>
      <IonButton color="secondary" href="#">Sort by Price</IonButton>

        <IonList>
          {groceries.filter(g =>
            searchText === undefined ||
            g.name.toLowerCase().includes(searchText.toLowerCase()) ||
            g.store.toLowerCase().includes(searchText.toLowerCase())).sort((a, b) => a.name.localeCompare(b.name))
            .map(g => <GroceryListItem key={g.id} grocery={g} />)}
        </IonList>
        
        <IonButton color="primary" expand="full" href="#">Add Item</IonButton>


        <IonButton color="tertiary" href="#">Settings</IonButton>
        <IonButton color="light" shape="round" href="#">Light/Dark Mode Toggle</IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Home;
