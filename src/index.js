import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import {BrowserRouter} from "react-router-dom";
import { AuthContextProvider} from './Components/Auth/Auth'

axios.defaults.baseURL = 'https://works.spiderworks.co.in/crm-admin/api/';
ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
           <AuthContextProvider>
              <App />
           </AuthContextProvider>
        </React.StrictMode>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();