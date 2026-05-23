import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import ErrorPage from './ErrorPage.jsx';
import { MobileScreen } from './Components/MobileScreen.jsx';


const router = createBrowserRouter([
    {
        path: "/SearchMeOS/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/SearchMeOS/mobile",
        element: <MobileScreen />,
        errorElement: <ErrorPage />,
    },

]);

createRoot(document.getElementById('root')).render(
    //   <StrictMode>
    <RouterProvider router={router} />
    //   </StrictMode>,
);