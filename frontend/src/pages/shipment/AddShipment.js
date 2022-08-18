import React from "react";
import "./AddShipment.css";
import axios from "axios";
import { useState} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function AddShipment() {
  toast.configure();
  const [state, setState] = useState({
    from: "",
    to: "",
    via: "",
    estimated_delivery: "",
    in_progress: "",
    customerName: "",
    customerPhone: "",
    customerAddress: "",
  });


  const handleChange = (e) => {
    e.persist();
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      from: state.from,
      to: state.to,
      via: state.via,
      estimated_delivery: state.estimated_delivery,
      in_progress: state.in_progress,
      user_id: state.user_id,
      customerName: state.customerName,
      customerPhone: state.customerPhone,
      customerAddress: state.customerAddress,
    };
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios
      .post(`http://127.0.0.1:8000/api/shipments`, data, config)
      .then((res) => {
        setState({
          from: "",
          to: "",
          via: "",
          estimated_delivery: "",
          in_progress: "",
          from: "",
          to: "",
          via: "",
          estimated_delivery: "",
          in_progress: "",
          customerName: "",
          customerPhone: "",
          customerAddress: "",
        });
        toast.success("Shipment added Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While adding Shipment");
      });
  };

  return (
    <div>
      <Header />
      <div>
        {" "}
        <div id="addshipment-container" onSubmit={handleSubmit}>
          <h1>Add Shipment</h1>
          <div className="addshipment-underline"></div>
          <form id="addshipment_form">
            <div className="addshipment-name">
              <label for="name"></label>
              <input
                type="text"
                placeholder="From"
                name="from"
                id="from_input"
                onChange={handleChange}
                value={state.from}
                required
              />
            </div>
            <div className="addShipment-right">
              <label for="name"></label>
              <input
                type="text"
                placeholder="To"
                name="to"
                id="to_input"
                onChange={handleChange}
                value={state.to}
                required
              />
            </div>
            <div className="addshipment-name">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Via"
                name="via"
                id="via_input"
                onChange={handleChange}
                value={state.via}
                required
              />
            </div>
            <div className="addShipment-right">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Delivery"
                name="estimated_delivery"
                id="estimated_delivery_input"
                onChange={handleChange}
                value={state.estimated_delivery}
                required
              />
            </div>

            <div className="addshipment-name">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Progress"
                name="in_progress"
                id="in_progress_input"
                onChange={handleChange}
                value={state.in_progress}
                required
              />
            </div>
            <div  className="addShipment-right">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Customer Name"
                name="customerName"
                id="customerName"
                onChange={handleChange}
                value={state.customerName}
                required
              />
            </div>
            <div className="addShipment-right">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Customer Phone"
                name="customerPhone"
                id="customerPhone"
                onChange={handleChange}
                value={state.customerPhone}
                required
              />
            </div>
            <div className="addshipment-name">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Customer Address"
                name="customerAddress"
                id="customerAddress"
                onChange={handleChange}
                value={state.customerAddress}
                required
              />
            </div>

            <div className="addshipment-submit">
              <input type="submit" value="save" id="form_button-addshipment" />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default AddShipment;
