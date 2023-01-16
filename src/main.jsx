import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root, { loader as rootLoader, createContactAction as rootAction } from './routes/root'
import ErrorPage from "./error-page.jsx";
import Contact, { loader as contactLoader, action as contactAction } from "./routes/contact.jsx";
import EditContact, { action as editAction } from "./routes/edit.jsx";
import Index from "./routes/index.jsx";
import { action as destroyAction } from "./routes/destroy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children:[
      {
        errorElement:<ErrorPage />,
        children:[
          {
            path:"contacts/:contactId",
            element:<Contact />,
            loader:contactLoader,
            action:contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
          {
            index:true,
            element:<Index />,
          }
        ]
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
