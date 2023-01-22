import Loading from '@components/Loading';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import Routes from '@routes/index';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { StatusBar } from 'react-native';
import { THEME } from './src/theme';

// import { Container } from './styles';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent  />
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  )
}

export default App;