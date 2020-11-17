import React from 'react';
import { View, StatusBar } from 'react-native';

import Home from './pages/Home';
import SignIn from './pages/SignIn';

const App: React.FC = () => (
  <>
    <StatusBar barStyle="dark-content" backgroundColor="#FAFBFD" />
    <View style={{ flex: 1, backgroundColor: '#FAFBFD' }}>
      <SignIn />
    </View>
  </>
);

export default App;
