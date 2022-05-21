import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import { withAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

class Confirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    localStorage.removeItem("confirmation");
  }

  static contextType = RoomContext;

  render() {
    const { bookedDetails, paymentDetails } = this.context;

    return (
      <>
        <div className="container">
          <div className="row mt-5 mb-4 text-center">
            <h3>Booking Confirmed</h3>
          </div>
          <hr className="w-50 mx-auto" />
          <div className="row m-3">
            <h4>Booking Details</h4>
          </div>

          <div className="row m-3 mb-5">
            <div className="col border-end">
              <p>Booking ID</p>
              <h6>{bookedDetails.bookingId}</h6>
            </div>
            <div className="col border-end">
              <p>Check-in</p>
              <h6>{bookedDetails.checkIn}</h6>
            </div>
            <div className="col border-end">
              <p>Check-out</p>
              <h6>{bookedDetails.checkOut}</h6>
            </div>
            <div className="col border-end">
              <p>Total</p>
              <h6>{`₹${bookedDetails.total}`}</h6>
            </div>
            <div className="col border-end">
              <p>Status</p>
              <h6>{bookedDetails.bookingStatus}</h6>
            </div>
          </div>

          <hr className="w-50 mx-auto" />
          <div className="row m-3 mt-4">
            <h4>Payment Details</h4>
          </div>

          <div className="row m-3">
            <div className="col border-end">
              <p>Payment ID</p>
              <h6>{paymentDetails.paymentId}</h6>
            </div>
            <div className="col border-end">
              <p>Date</p>
              <h6>{paymentDetails.date}</h6>
            </div>
            <div className="col border-end">
              <p>Payment Method</p>
              <h6>{paymentDetails.paymentMethod}</h6>
            </div>
            <div className="col border-end">
              <p>Total</p>
              <h6>{`₹${paymentDetails.total}`}</h6>
            </div>
            <div className="col border-end">
              <p>Status</p>
              <h6>{paymentDetails.paymentStatus}</h6>
            </div>
          </div>

          <div className="row m-3">
            <button
              className="btn-primary w-25 mt-5"
              onClick={() => {
                window.print();
              }}
            >
              Print
            </button>
          </div>
        </div>

        {/**  <section className="room-extras">
          <h6>extras</h6>
          <ul className="extras">
            {extras.map((item, index) => {
              return <li key={index}>- {item}</li>;
            })}
          </ul>
        </section>*/}
      </>
    );
  }
}

export default withAuth0(Confirmation);
