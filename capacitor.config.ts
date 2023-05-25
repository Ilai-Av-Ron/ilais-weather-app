import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ilais-weather-app',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
