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
import FeedsManagement from "./Feeds";
import Plans from "./Plans";

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
            label: "Feeds",
            onClick: () => navigate("/feed"),
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
            label: "Settings",
            onClick: () => navigate("/setting"),
          }
          ,
          {
            label: "Plans",
            onClick: () => navigate("/plans"),
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
            <Route path="/feed" element={<FeedsManagement/>} />   
            <Route path="/plans" element={<Plans/>} />
            
          </Routes>
        </Frame>
      </AppProvider>
    </Router>
  );
}

export default App;
