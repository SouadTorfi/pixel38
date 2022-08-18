import React from "react";
import "./EditShipment.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";

function EditShipment() {
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

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleShipment(id);
    }
  }, [id]);
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const getSingleShipment = async (id) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/shipments/${id}`,
      config
    );
    console.log(response);
    if (response.status === 200) {
      setState({ ...response.data.data });
    }
  };

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

    axios
      .post(`http://127.0.0.1:8000/api/shipments/${id}`, data, config)
      .then((res) => {
        console.log(res.data);
        setState({});
        toast.success("Shipment Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Updating Shipment");
      });
  };
  return (
    <div>
      <Header />
      <div>
        {" "}
        <div id="editshipment-container" onSubmit={handleSubmit}>
          <h1>Edit Shipment</h1>
          <div className="editshipment-underline"></div>
          <form id="editshipment_form">
            <div className="editshipment-name">
              <label for="name"></label>
              <input
                type="text"
                placeholder="From"
                name="from"
                id="from"
                onChange={handleChange}
                value={state.from}
                required
              />
            </div>

            <div className="editshipment-right">
              <label for="name"></label>
              <input
                type="text"
                placeholder="To"
                name="to"
                id="to"
                onChange={handleChange}
                value={state.to}
                required
              />
            </div>
            <div className="editshipment-name">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Via"
                name="via"
                id="via"
                onChange={handleChange}
                value={state.via}
                required
              />
            </div>
            <div className="editshipment-right">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Delivery"
                name="estimated_delivery"
                id="estimated_delivery"
                onChange={handleChange}
                value={state.estimated_delivery}
                required
              />
            </div>

            <div className="editshipment-name">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Progress"
                name="in_progress"
                id="in_progress"
                onChange={handleChange}
                value={state.in_progress}
                required
              />
            </div>
            <div className="editshipment-right">
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
            <div className="editshipment-right">
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
            <div className="editshipment-name">
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

            <div className="editshipment-submit">
              <input type="submit" value="save" id="form_button-editshipment" />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default EditShipment;
