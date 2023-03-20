import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import PageNotFound from './pages/PageNotFound';
import Repositories from './pages/Repositories';
import Success from './pages/Success';
import { Provider } from "react-redux"
import { store } from './store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AuthGuard from './guards/AuthGuard';
import DarkModeWrapper from './components/DarkModeWrapper';

function App() {
  let persistor = persistStore(store)
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <DarkModeWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/success" element={<Success />} />
              <Route
                path="/repos/:user?"
                element={<AuthGuard><Repositories /></AuthGuard>}
              ></Route>
              <Route path='*' element={<PageNotFound />}></Route>
            </Routes>
          </DarkModeWrapper>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
