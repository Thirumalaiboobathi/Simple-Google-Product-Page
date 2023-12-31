import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screen/home/home';
import CreateAccount from './screen/createaccount/createaccount';
import Services from './screen/services/services';
import AboutUs from './screen/aboutUs/aboutUs';
import { AllRoutes } from './router/router';
import PaymentPage from './screen/payment/payment';
import ProductWindow from './screen/productwindow/productWindow';
import LoginPage from './screen/login/login';
import ProductHome from './screen/home/product-home';
import PrivateRoute from "./router/privateRoute";
import TableComponent from './screen/login/admin';
import ContactScreen from './screen/contact/contact';
import ServiceScreen from './screen/services/services';
import ProductScreen from './screen/products/products';

function App() {
  return (
    <BrowserRouter>
      <div>
       

        {/* Routes */}
        <Routes>
          <Route path={AllRoutes.home} element={<Home />} />
          <Route path={AllRoutes.createaccount} element={<CreateAccount />} />
          <Route path={AllRoutes.services} element={<Services />} />
          <Route path={AllRoutes.aboutus} element={<AboutUs />} />
          <Route path={AllRoutes.payment} element={<PaymentPage />} />
          <Route path={AllRoutes.productwindow} element={<ProductWindow />} />
          <Route path={AllRoutes.login} element={<LoginPage />} />
          <Route path={AllRoutes.contact} element={<ContactScreen />} />
          <Route path={AllRoutes.service} element={<ServiceScreen />} />
          <Route path={AllRoutes.products} element={<ProductScreen />} />
  
  
  
           {/* Home Route */}
          <Route path={AllRoutes.producthome} element={
            <PrivateRoute path={AllRoutes.producthome}>
              <ProductHome />
            </PrivateRoute>
          } />
            <Route path={AllRoutes.admin} element={
            <PrivateRoute path={AllRoutes.admin}>
              <TableComponent />
            </PrivateRoute>
          } />
        </Routes>
          
      </div>
    </BrowserRouter>
  );
}

export default App;
