import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import store from './store/store.js';
import './index.css';
import App from './App';
import AddProduct, { addProductAction } from './pages/AddProduct';
import EditProduct, { editProductAction } from './pages/EditProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import reportWebVitals from './reportWebVitals';

const ErrorPage = () => {
    return (
        <h1>Error page</h1>
    )
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'add-product',
                //loader: dashboardLoader,
                action: addProductAction,
                element: <AddProduct />
            },
            {
                path: 'edit-product',
                action: editProductAction,
                element: <EditProduct />
            },
            {
                path: 'login',
                //loader: dashboardLoader,
                action: addProductAction,
                element: <Login />
            },
            {
                path: 'register',
                //loader: dashboardLoader,
                action: addProductAction,
                element: <Register />
            }
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <RouterProvider router={router} />
        </ReduxProvider>,
    </React.StrictMode>
);

reportWebVitals();
