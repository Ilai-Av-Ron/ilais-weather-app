import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonActionSheet,
  IonIcon,
} from '@ionic/react';
import axios from 'axios';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import { sunny, cloud, rainy, snow, partlySunny, water, leaf } from 'ionicons/icons';
import franceImage from '../Images/france.png';
import israelImage from '../Images/israel.png';
import australiaImage from '../Images/australia.png';
import ukImage from '../Images/united-kingdom.png';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCityUrl, setSelectedCityUrl] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);


  const openActionSheet = () => {
    setShowActionSheet(true);
  };

  const closeActionSheet = () => {
    setShowActionSheet(false);
  };

  const handleCitySelection = (city: string) => {
    setSelectedCity(city);
    closeActionSheet();
    setSelectedCityUrl(getCityUrl(city)); 
  };

  const getCityUrl = (city: string) => {
    switch (city) {
      case 'Paris':
        return franceImage
      case 'London':
        return ukImage;
      case 'Tel Aviv':
        return israelImage;
      case 'Sydney':
        return australiaImage;
      default:
        return '';
    }
  };

  
  useEffect(() => {
    const fetchForecastData = async () => {
      if (selectedCity) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=84690eb441e558ccde11163158ae8676`
            );
          setForecastData(response.data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }
    };

    fetchForecastData();
  }, [selectedCity]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (selectedCity) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid={appID}`
          );
          setWeatherData(response.data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }
    };

    fetchWeatherData();
  }, [selectedCity]);

  const convertKelvinToCelsius = (kelvin: number) => {
    return Math.round(kelvin - 273.15);
  };

  const getWeatherIconName = (weatherMain: string) => {
    switch (weatherMain) {
      case 'Clear':
        return sunny;
      case 'Clouds':
        return cloud;
      case 'Rain':
        return rainy;
      case 'Snow':
        return snow;
      default:
        return partlySunny;
    }
  };

  const [todayWeatherData, setTodayWeatherData] = useState<any>(null);
  
  const getTemperatureIconName = (description: string) => {
    if (description.includes('cloud')) {
      return partlySunny;
    } else if (description.includes('sun') || description.includes('clear')) {
      return sunny;
    } else if (description.includes('snow')) {
      return snow;
    } else {
      return partlySunny;
    }
  };

  const renderCalendar = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDate = new Date();
  
    const calendarDates = Array.from({ length: 4 }, (_, index) => {
      const date = new Date();
      date.setDate(currentDate.getDate() + index + 1); 
      return date;
    });
  
    if (forecastData) {
      return (
        <div className="calendar">
          {calendarDates.map((date, index) => {
            const forecastItem = forecastData.list.find((item: any) => {
              const forecastDate = new Date(item.dt * 1000);
              return forecastDate.getDate() === date.getDate();
            });
  
            if (forecastItem) {
              const temperature = convertKelvinToCelsius(forecastItem.main.temp);
              const weatherIcon = forecastItem.weather[0].icon; 
  
              return (
                <div className="calendar-day" key={index}>
                  <div className="calendar-date">{date.getDate()}</div>
                  <div className="calendar-day-of-week">{daysOfWeek[date.getDay()]}</div>
                  <div className="temperature">
                    <p>{temperature}°C</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherIcon}.png`}
                      alt="Weather Icon"
                      className="weather-icon"
                    />
                  </div>
                </div>
              );
            }
  
            return null;
          })}
        </div>
      );
    }
  
    return null;
  };
  
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle>Ilai&apos;s Weather App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="weather-page" fullscreen>
        <IonList className='selector'>
          <IonItem button onClick={openActionSheet}>
            <IonLabel>Select a city</IonLabel>
            <IonLabel slot="end">{selectedCity}</IonLabel>
          </IonItem>
        </IonList>
        {weatherData && (
          <div className="selected-city">
          <h2>
            {selectedCity} {selectedCityUrl && <img src={selectedCityUrl} alt={selectedCity} style={{ width: '1em', height: '1em', verticalAlign: 'middle' }} />}
          </h2>
            <p className="temperature">
              Temperature: {convertKelvinToCelsius(weatherData.main.temp)}°C
            </p>
            <p className="description">
            <IonIcon
              icon={getWeatherIconName(weatherData.weather[0].main)}
              className="weather-icon"
            /> Description: {weatherData.weather[0].description}
            </p>
            <p className="weather-details">
              <IonIcon icon={water} className="weather-icon" /> Humidity:{' '}
              {weatherData.main.humidity}%
            </p>
            <p className="weather-details">
              <IonIcon icon={leaf} className="weather-icon" /> Wind Speed:{' '}
              {weatherData.wind.speed} m/s
            </p>
            {renderCalendar()}
          </div>
          
        )}
      
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={closeActionSheet}
          buttons={[
            {
              text: 'Paris',
              handler: () => handleCitySelection('Paris'),
              cssClass: 'select-Paris'
            },
            {
              text: 'London',
              handler: () => handleCitySelection('London'),
              cssClass: 'select-London'
            },
            {
              text: 'Tel Aviv',
              handler: () => handleCitySelection('Tel Aviv'),
              cssClass: 'select-Tel Aviv'
            },
            {
              text: 'Sydney',
              handler: () => handleCitySelection('Sydney'),
              cssClass: 'select-Sydney',
            },
            {
              text: 'Cancel',
              role: 'cancel',
              handler: closeActionSheet,
              cssClass: 'cancel-button',
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
