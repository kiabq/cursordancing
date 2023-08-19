//? Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter, 
  RouterProvider 
} from "react-router-dom";

//? Components
import App from './App';
import Room from './pages/Room';
import Lobby from './pages/Lobby';
import InvalidRoom from './pages/InvalidRoom';

//? Context
import { SocketProvider } from './contexts/socket';

//? Styling
import './index.css';
import './App.css';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Lobby />
  },
  {
    path: "/room/:room",
    element: <Room />
  },
  {
    path: '/invalid-room',
    element: <InvalidRoom />
  }
])

root.render(
  <React.StrictMode>
    <SocketProvider>
      <RouterProvider router={router}/>
    </SocketProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
