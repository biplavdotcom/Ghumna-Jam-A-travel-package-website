import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Discover from "./pages/Discover";
import DiscoverDetails from "./pages/DiscoverDetails";
import PlacesRoute from "./pages/PlacesRoute";
import NoPage from "./pages/NoPage";
import Login from "./component/Login";
import Register from "./component/Register";
import Logout from "./component/Logout";
import FillDetail from "./component/FillDetail";
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> {/* Default route */}
            <Route path="home" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="discover" element={<Discover />} />
            <Route path="blogs/:id" element={<DiscoverDetails />} />
            <Route path="places" element={<PlacesRoute />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="fill-detail" element={<FillDetail />} />
            <Route path="*" element={<NoPage />} /> {/* 404 route */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
