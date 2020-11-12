import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { IonItem, IonLabel, IonInput, IonButton, IonIcon, IonAlert } from '@ionic/react';

<<<<<<< Updated upstream
import globals from '../data/globals';

function validateEmail(email: string) {
=======
function validateUsername(username: string) {
>>>>>>> Stashed changes
    return true;
}
const Login: React.FC = () => {
  const history = useHistory();
<<<<<<< Updated upstream
  const [email, setEmail] = useState<string>("glizzygatherer");
  const [password, setPassword] = useState<string>("letmein");
=======
  const [username, setUsername] = useState<string>("example_username");
  const [password, setPassword] = useState<string>("cityslicka");
>>>>>>> Stashed changes
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [token, setToken] = useState<string>('');
  const handleLogin = () => {
    if (!username) {
        setMessage("Please enter a valid username");
        setIserror(true);
        return;
    }
    if (validateUsername(username) === false) {
        setMessage("Your username is invalid");
        setIserror(true);
        return;
    }

    if (!password || password.length < 6) {
        setMessage("Please enter your password");
        setIserror(true);
        return;
    }

<<<<<<< Updated upstream
    globals.api.post('/login', {username: email, password: password}, {headers: {'content-type': 'application/json'}})
=======
    const loginData = {
        "username": username,
        "password": password
    }

    const api = axios.create({
        baseURL: `https://localhost3000/`
    })
    api.post("/login", loginData)
>>>>>>> Stashed changes
        .then(res=> {             
            globals.token = res.data['auth_token'];
            history.push('/home');
         })
         .catch(error=>{
            setMessage("Auth failure! Please create an account");
            console.log(error);
            setIserror(true)
         })
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
        <IonRow>
          <IonCol>
            <IonAlert
                isOpen={iserror}
                onDidDismiss={() => setIserror(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                buttons={["Dismiss"]}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonIcon
                style={{ fontSize: "70px", color: "#0040ff" }}
                icon={personCircle}
            />
          </IonCol>
        </IonRow>
          <IonRow>
            <IonCol>
            <IonItem>
            <IonLabel position="floating"> Username</IonLabel>
            <IonInput
                type="text"
                value={username}
                onIonChange={(e) => setUsername(e.detail.value!)}
                >
            </IonInput>
            </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
            <IonItem>
              <IonLabel position="floating"> Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                >
              </IonInput>
            </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <p style={{ fontSize: "small" }}>
                  By clicking LOGIN you agree to our <a href="#">Policy</a>
              </p>
              <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
              <p style={{ fontSize: "medium" }}>
                  Don't have an account? <a href="#">Sign up!</a>
              </p>

            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;