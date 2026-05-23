import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import ErrorPage from './ErrorPage.jsx';
import { MobileScreen } from './Components/MobileScreen.jsx';


// have to use HashRouter bc of github pages

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/mobile",
        element: <MobileScreen />,
        errorElement: <ErrorPage />,
    },

]);

createRoot(document.getElementById('root')).render(
    //   <StrictMode>
    <RouterProvider router={router} />
    //   </StrictMode>,
);