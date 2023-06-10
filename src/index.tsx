import React from 'react';
import ReactDOM from 'react-dom/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App, { loader as appLoader, action as appAction } from './App';
import Customer, {
  loader as customerLoader,
} from './ui/components/customer/component';
import Login, { action as loginAction } from './ui/components/login/component';
import User, { loader as userLoader } from './ui/components/user/component';
import Area, {
  loader as areaLoader,
  action as areaAction,
} from './ui/components/area/component';
import Panel, {
  loader as panelLoader,
  action as panelAction,
} from './ui/components/panel/component';
import Theme from './ui/styles/theme';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: appLoader,
    action: appAction,
    children: [
      {
        index: true,
        element: <div>Tudo pronto!</div>,
      },
      {
        path: 'customer/:customerId',
        element: <Customer />,
        loader: customerLoader,
      },
      {
        path: 'customer/:customerId/area/:areaId',
        element: <Area />,
        loader: areaLoader,
        action: areaAction,
      },
      {
        path: 'user',
        element: <User />,
        loader: userLoader,
      },
      {
        path: 'panel',
        element: <Panel />,
        loader: panelLoader,
        action: panelAction,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
    action: loginAction,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    </LocalizationProvider>
  </React.StrictMode>
);
