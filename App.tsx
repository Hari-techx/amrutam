import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import AppProviders from "./src/app/providers/AppProviders";
import { store } from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppProviders>
        <AppNavigator />
      </AppProviders>
    </Provider>
  );
}