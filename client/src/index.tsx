//? Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter, 
  RouterProvider 
} from "react-router-dom";

//? Components
import App from './App';
import Home from './pages/Home';
import CreateRoom from './pages/CreateRoom';
import InvalidRoom from './pages/InvalidRoom';

//? Styling
import './index.css';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/room/:room",
    element: <App />
  },
  {
    path: '/create-room',
    element: <CreateRoom />
  },
  {
    path: '/invalid-room',
    element: <InvalidRoom />
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
