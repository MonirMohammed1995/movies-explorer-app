import Home from '../pages/Home';
import Movies from '../pages/Movies';
import MainLayout from '../layouts/MainLayout';
import { createBrowserRouter } from 'react-router';


export const router = createBrowserRouter([
  {
    path: '/',
    element:<MainLayout/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'movies',
        element: <Movies />,
      },
    ],
  },
]);