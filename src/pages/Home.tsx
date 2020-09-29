import MessageListItem from '../components/MessageListItem';
import React, { useState } from 'react';
import { Message, getMessages } from '../data/messages';
import {
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

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Glizzy</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonInput value={searchText} placeholder="Search for Items" onIonChange={e => setSearchText(e.detail.value!)}></IonInput>
        <IonList>
          {groceries.filter(g =>
            searchText === undefined ||
            g.name.toLowerCase().includes(searchText.toLowerCase()) ||
            g.store.toLowerCase().includes(searchText.toLowerCase()))
            .map(g => <GroceryListItem key={g.id} grocery={g} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
