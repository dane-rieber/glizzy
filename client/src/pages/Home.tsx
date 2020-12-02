import MessageListItem from '../components/MessageListItem';
import React, { useState } from 'react';

import { Message, getMessages } from '../data/messages';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  useIonViewWillEnter,
  IonLabel,
  IonSelectOption,
  IonItem
} from '@ionic/react';

import './Home.css';
import { getGroceries, Grocery } from '../data/groceries';
import GroceryListItem from '../components/GroceryListItem';
import globals from '../data/globals';
import { useHistory } from 'react-router';

const Home: React.FC = () => {

  const history = useHistory();

  const [messages, setMessages] = useState<Message[]>([]);
  const [groceries, setGroceries] = useState<Grocery[]>([]);
  const [searchText, setSearchText] = useState<string>();
  const [sortOption, setSortOption] = useState<number>(0);

  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
    const gs = getGroceries();
    setGroceries(gs);
    globals.api.get('/lists', { headers: { Authorization: globals.token } })
      .then(res => {
        globals.list_id = res.data[0]['id'];
        globals.api.get(`/list/${globals.list_id}`, { headers: { Authorization: globals.token } })
          .then(res2 => {
            var data = res2.data['groceries'];
            for (var g of data) {
              g['store'] = globals.stores.filter(s => s['id'] === g['store_id'])[0]['name'];
            }
            setGroceries(data);
          })
      })
      .catch(error => {
        console.log(error);
      });
  });

  const sortFunctions = [
    function(a: Grocery, b: Grocery) {return a.name.localeCompare(b.name);},
    function(a: Grocery, b: Grocery) {return a.store.localeCompare(b.store);},
  ];

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  function add_item_onClick() {
    history.push('/grocery/new');
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

        <IonItem>
          <IonLabel>Sort by</IonLabel>
          <IonSelect okText="Okay" cancelText="Dismiss" value={sortOption} onIonChange={e => setSortOption(e.detail.value!)}>
            <IonSelectOption value={0}>Name</IonSelectOption>
            <IonSelectOption value={1}>Store</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonList>
          {groceries.filter(g =>
            searchText === undefined ||
            g.name.toLowerCase().includes(searchText.toLowerCase()) ||
            g.store.toLowerCase().includes(searchText.toLowerCase())).sort(sortFunctions[sortOption])
            .map(g => <GroceryListItem key={g.id} grocery={g} />)}
        </IonList>

        <IonButton color="primary" expand="block" onClick={add_item_onClick}>Add Item</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
