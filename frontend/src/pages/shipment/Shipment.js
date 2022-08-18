import React from "react";
import { useState, useEffect } from "react";
import "./Shipment.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loader/Loader";

function Shipment() {
  const [shipment, setShipment] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllShipments();
  }, []);
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const getAllShipments = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/shipments`, config)
      .then((res) => {
        setShipment(res.data.data);
        console.log("first", res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function cancelShipment(t_id) {
    if (window.confirm("Are you sure you want to cancel Shipment?")) {
      const response = await axios
        .delete(`http://127.0.0.1:8000/api/shipments/${t_id}`, config)
        .then((res) => {
          toast.success("Shipment canceled Successfully");
          getAllShipments();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div>
      <Header />
      <div className="shipment-container">
        {loading ? (
          <Loading />
        ) : (
          <>
            <h1>All Shipments</h1>

            <div className="shipment-underline"></div>
            <h4></h4>
            <Link to="/addshipment">
              <button className="add-shipment-btn">Add Shipment</button>
            </Link>
            <ul className="shipment-responsive-table">
              <li className="table-content">
                <div className="col col-1">From</div>
                <div className="col col-1">To</div>
                <div className="col col-1">Via</div>
                <div className="col col-1">Delibery</div>
                <div className="col col-1">C.Name</div>
                <div className="col col-1">C.Phone</div>
                <div className="col col-1">C.Address</div>
                <div className="col col-1">Action</div>
              </li>
              {shipment &&
                shipment.map((item, index) => {
                  return (
                    <li className="shipment-table-row" key={index}>
                      <div className="col col-1" data-label="From">
                        {item.from}
                      </div>
                      <div className="col col-1" data-label="To">
                        {item.to}
                      </div>

                      <div className="col col-1" data-label="Via">
                        {item.via}
                      </div>
                      <div className="col col-1" data-label="Delivery">
                        {item.estimated_delivery}
                      </div>
                      <div className="col col-1" data-label="CustomerName">
                        {item.customerName}
                      </div>
                      <div className="col col-1" data-label="CustomerPhone">
                        {item.customerPhone}
                      </div>
                      <div className="col col-1" data-label="CustomerAddress">
                        {item.customerAddress}
                      </div>

                      <div className="col col-1">
                        <div className="update">
                          <div className="opacity">
                            <Link to={"/editshipment/" + item.id}>
                              <button>Update</button>
                            </Link>
                          </div>
                        </div>
                        <div className="delete">
                          <div className="opacity">
                            <button onClick={() => cancelShipment(item.id)}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Shipment;
