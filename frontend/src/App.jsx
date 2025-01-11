import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Discover from "./pages/Discover";
import DiscoverDetails from "./pages/DiscoverDetails";
import PlacesRoute from "./pages/PlacesRoute";
import NoPage from "./pages/NoPage";
import Login from "./component/Login";
import Register from "./component/Register";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/blogs/:id" element={<DiscoverDetails />} />
            <Route path="/places" element={<PlacesRoute />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
