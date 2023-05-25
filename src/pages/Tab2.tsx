import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ilai&apos;s Weather App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='donate-page'>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='donate-page'>
          <div className="global-warming-content">
            <h2>About Global Warming</h2>
            <p>
              As you can see from this terrible weather app, the earth and its cities just keep getting warmer. This change happens mainly due to human activities, primarily the emission of greenhouse gases. It is a pressing issue that requires immediate attention and action from individuals, communities, and governments worldwide, before it&apos;s too late for our beautiful planet.
            </p>
            <div className="image-container">
              <img src="https://uniteforchange.com/wp-content/uploads/2022/06/Blog-Images2.jpg" alt="Global warming image 1" />
            </div>
            <h3>Take Action</h3>
            <p>
              Help combat global warming by supporting organizations dedicated to environmental conservation and taking steps to reduce your carbon footprint. Here are some resources:
            </p>
            <p>
              <a href="https://www.coolearth.org/donate/">Donate to Stop Global Warming</a>
            </p>
            <p>
              <a href="https://www.un.org/actnow?gclid=CjwKCAjw67ajBhAVEiwA2g_jEJiD-tzCVRf8X1jWImwK_Xo9UAbIRlb6TyzNwl2VqpuP0g-eyBCY0hoCMz4QAvD_BwE">What Can I Do?</a>
            </p>
            <p className="heart-symbol">&#10084;
              </p>
            
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
