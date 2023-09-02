import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider,} from 'react-router-dom'; //from react-router-dom
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminLoginScreen from './screens/adminScreens/adminLoginScreen';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import AdminHomeScreen from './screens/adminScreens/AdminHomeScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route path='/admin' element={<AdminLoginScreen/>}/>

      <Route path='' element={<AdminPrivateRoute />} >
        <Route path='/admin/adminHome' element={<AdminHomeScreen />} />
      </Route>
      
      {/* private Routes */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
