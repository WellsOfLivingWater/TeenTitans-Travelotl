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

// Components
import App from './App';
import Main from './components/Main';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import Manager from './components/Manager';
import Form from './components/Form';
import Page1 from './components/formPages/Page1';
import Page2 from './components/formPages/Page2';
import Page3 from './components/formPages/Page3';
import Page4 from './components/formPages/Page4';
import Page5 from './components/formPages/Page5';
import Page6 from './components/formPages/Page6';
import ItineraryPage from './components/itineraryComponents/ItineraryPage';
// import Register from './components/Register';

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
          <Route path="/" element={<App />}> {/* The root route */}
            <Route index element={<Main />} /> {/* The main page */}

            {/* Header link routes */}
            <Route path='/manager' element={<Manager />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* Form route with nested routes for each page of the form */}
            <Route path="/form" element={<Form />}>
              <Route index element={<Page1 />} />
              <Route path="/form/page2" element={<Page2 />} />
              <Route path="/form/page3" element={<Page3 />} />
              <Route path="/form/page4" element={<Page4 />} />
              <Route path="/form/page5" element={<Page5 />} />
              <Route path="/form/page6" element={<Page6 />} />
            </Route>

            {/* Itinerary route */}
            <Route path="/itinerary" element={<ItineraryPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);