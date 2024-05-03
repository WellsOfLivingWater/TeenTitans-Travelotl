/**
 * @file Entry point for the React application. It sets up the Redux store,
 * and defines the routes of the app using React Router.
 */
// Package dependencies
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Reducers
import tripReducer from './reducers/tripReducer';
import itineraryReducer from './reducers/itineraryReducer';
import suggestionsReducer from './reducers/suggestionsReducer';
import userReducer from "./reducers/userReducer";

// Components
import App from './App';
import Main from './components/Main';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import Manager from './components/Manager';
import Form from './components/Form';
import ItineraryPage from './components/itineraryComponents/ItineraryPage';


// Styles
import '../styles.css';

/**
 * The Redux store.
 */
export const store = configureStore({
  reducer: {
    trip: tripReducer,
    itinerary: itineraryReducer,
    suggestions: suggestionsReducer,
    user: userReducer,
  }
});

/**
 * The root element of the app.
 */
const root = document.getElementById('root');

/**
 * Render the app.
 */
createRoot(root).render(
  <React.StrictMode> {/* Strict mode helps catch common bugs */}
    <Provider store={store}> {/* Connects the Redux store to the app */}
      <Router> {/* Sets up the React Router */}
        <Routes> {/* Defines the routes of the app */}
          
          {/* The root route */}
          <Route path="/" element={<App />}>
            
            {/* The main page */}
            <Route index element={<Main />} />

              {/* Header link routes */}
              <Route path='/manager' element={<Manager />} />
              <Route path='/about' element={<About />} />
              {/* <Route path='/login' element={<Login />} /> */}
              <Route path='/register' element={<Register />} />

            {/* Form route */}
            <Route path="/form" element={<Form />} />

            {/* Itinerary route */}
            <Route path="/itinerary" element={<ItineraryPage />} />

          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);