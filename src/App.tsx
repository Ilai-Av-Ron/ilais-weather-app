import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cloud, earth } from 'ionicons/icons'; // Replace with the desired icons for weather and donating
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/weather">
            <Tab1 />
          </Route>
          <Route exact path="/donate">
            <Tab2 />
          </Route>
          <Route exact path="/">
            <Redirect to="/weather" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="weather" href="/weather">
            <IonIcon aria-hidden="true" icon={cloud} />
            <IonLabel>Weather</IonLabel>
          </IonTabButton>
          <IonTabButton tab="donate" href="/donate">
            <IonIcon aria-hidden="true" icon={earth} />
            <IonLabel>Donate</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
