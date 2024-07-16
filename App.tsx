import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Navigator from './navigation/Navigator';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
      <PaperProvider>
         <Navigator />
      </PaperProvider>
  );
}


