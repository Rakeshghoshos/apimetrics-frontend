import './App.css';
import { createBrowserRouter ,RouterProvider } from 'react-router-dom';
import Home from "./pages/Home";
import LoginPage from './pages/LoginPage';
import Signup from './components/auth/SignUp';
import Dashboard from './pages/Dashboard';
import Metrics from './components/apimetrics/Metrics';
import Storage from './core/storage';
import Logout from './components/auth/Logout';

function App() {
  const token = Storage.getValues("token");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children:[
        {
          path:"home",
          element: token !== undefined ? <Home /> : <LoginPage />
        },
        {
          path:"apimmetrics",
          element: token !== undefined ? <Metrics /> : <LoginPage />
        },
        {
          path:"logout",
          element: token !== undefined ? <Logout /> : <LoginPage />
        }
      ]
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
