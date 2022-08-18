import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Shipment from "./pages/shipment/Shipment";
import AddShipment from "./pages/shipment/AddShipment";
import EditShipment from "./pages/shipment/EditShipment";
import NotFound from "./components/notfound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact element={<ProtectedRoutes />}>
          <Route exact path="/shipment" element={<Shipment />} />
          <Route exact path="/addshipment" element={<AddShipment />} />
          <Route exact path="/editshipment/:id" element={<EditShipment />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
