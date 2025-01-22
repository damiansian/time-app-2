import React from 'react';
import { Provider, defaultTheme, Flex, View } from '@adobe/react-spectrum';
import DateTimePicker from './DateTimePicker';
import '@spectrum-css/vars/dist/spectrum-global.css';
import '@spectrum-css/vars/dist/spectrum-medium.css';
import '@spectrum-css/vars/dist/spectrum-large.css';
import '@spectrum-css/button/dist/index-vars.css';
import './App.css';

function App() {
  return (
    <Provider theme={defaultTheme}>
      <Flex direction="column" alignItems="center" justifyContent="flex-start" minHeight="100vh" width="100%">
        <View className="App" padding="size-200" width="100%">
          <main>
            <h1>Select a day and time</h1>
            <DateTimePicker />
          </main>
        </View>
      </Flex>
    </Provider>
  );
}

export default App;
