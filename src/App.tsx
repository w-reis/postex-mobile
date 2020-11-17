import React from 'react';
import { View, StatusBar } from 'react-native';

import Home from './pages/Home';

const App: React.FC = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#FAFBFD" />
    <View style={{ flex: 1, backgroundColor: '#FAFBFD' }}>
      <Home />
    </View>
  </>
);

export default App;
