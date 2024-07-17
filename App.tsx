import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Navigator from './navigation/Navigator';
import Database from './components/Database'
import { initDatabase } from './components/Database';
import Home from './screens/Home'

export default function App() {
  // useEffect(() => {
  //   initDatabase()
  //     .then(() => console.log('Database initialized'))
  //     .catch(error => console.error('Database initialization failed:', error));
  // }, []);

  return (
    <PaperProvider>
      <Navigator />
      {/* <Home /> */}
    </PaperProvider>
  );
}
  