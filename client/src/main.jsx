import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import {store, persistor} from './redux/store.js'
import ThemeProvider from './components/ThemeProvider.jsx';
import App from './App.jsx'
import 'leaflet/dist/leaflet.css';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </PersistGate>
);
