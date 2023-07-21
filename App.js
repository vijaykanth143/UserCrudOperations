import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Users from './src/Screens/Users';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store/configureStore';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Users />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
