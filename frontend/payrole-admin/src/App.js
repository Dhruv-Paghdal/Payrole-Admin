import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Login from "./components/login";
import Layout from './components/layout';
import ErrorPage from "./components/errorPage";

const router = createBrowserRouter([
  {
    // path: "/Payrole-Admin/",
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />
    
  },
  {
    path: "/dashboard",
    // path: "/Payrole-Admin/dashboard",
    element: <Layout />,
  },
], {
  basename: "/Payrole-Admin"
});

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
