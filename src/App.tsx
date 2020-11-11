import React from 'react';
import { View, StatusBar } from 'react-native';

const App: React.FC = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#FAFBFD" />
    <View style={{ flex: 1, backgroundColor: '#FAFBFD' }} />
  </>
);

export default App;
