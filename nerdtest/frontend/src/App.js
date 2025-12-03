import {
  AppProvider,
  Frame,
  Navigation,
} from "@shopify/polaris";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import ProductsList from "./ProductList";
import AddProduct from "./AddProduct";
import ContactForm from "./ContactForm";
import ProductDetail from "./ProductDetail";
import Home from "./Home";
import SettingsPage from "./Setting";

// Wrapper to connect Polaris Navigation with React Router navigation
function AppNavigation() {
  const navigate = useNavigate();

  return (
    <Navigation location="/">
      <Navigation.Section
        items={[
           {
            label: "Home",
            onClick: () => navigate("/home"),
          },
          {
            label: "View Products",
            onClick: () => navigate("/"),
          },
          {
            label: "Add Product",
            onClick: () => navigate("/add"),
          },
          {
            label: "Contact Form",
            onClick: () => navigate("/contact"),
          },
          {
            label: "Setting",
            onClick: () => navigate("/setting"),
          }
          
        ]}
      />
    </Navigation>
  );
}

function App() {
  return (
    <Router>
      <AppProvider>
        <Frame navigation={<AppNavigation />}>
          <Routes>
            <Route path="/home" element={<Home/>} /> 
            <Route path="/" element={<ProductsList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/products/:id" element={<ProductDetail />} />  
            <Route path="/setting" element={<SettingsPage/>} />     
            
          </Routes>
        </Frame>
      </AppProvider>
    </Router>
  );
}

export default App;
