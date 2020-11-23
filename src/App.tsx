import React from 'react';
import { View, StatusBar } from 'react-native';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import RegisterAddress from './pages/RegisterAddress';

const App: React.FC = () => (
  <>
    <StatusBar barStyle="dark-content" backgroundColor="#FAFBFD" />
    <View style={{ flex: 1, backgroundColor: '#FAFBFD' }}>
      <RegisterAddress />
    </View>
  </>
);

export default App;
