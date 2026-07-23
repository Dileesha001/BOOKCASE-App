import { AppRegistry, Platform } from 'react-native';
import App from './App';

// Register standard React Native App
AppRegistry.registerComponent('main', () => App);

// Web entry point runner
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  if (rootTag) {
    AppRegistry.runApplication('main', {
      initialProps: {},
      rootTag,
    });
  }
}

export default App;
