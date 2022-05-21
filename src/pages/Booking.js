import React, { Component } from "react";
import defaultBcg from "../images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import StyledHero from "../components/StyledHero";
import emailjs from "@emailjs/browser";
import { withAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import PaytmButton from "../paytm-button/paytmButton";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // them
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import cards from "../images/card1.jpg";
import paytm from "../images/paytm.jpg";

class Booking extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg,
      bookingConfirm: false,
      date: [{ startDate: new Date(), endDate: new Date(), key: "selection" }],
      time: null,
      startDate: null,
      endDate: null,
      paidOnline: false,
      price: "",
      capacity: "",
      name: "",
      loading: false,
    };
  }

  static contextType = RoomContext;

  sendEmail = (room) => {
    const { changeContextState } = this.context;

    const price =
      Math.ceil(
        (new Date(this.state.endDate) - new Date(this.state.startDate)) /
          (1000 * 60 * 60 * 24)
      ) === 0
        ? room.price
        : Math.ceil(
            (new Date(this.state.endDate) - new Date(this.state.startDate)) /
              (1000 * 60 * 60 * 24)
          ) * room.price;

    const bookingId = `PR${Math.floor(Math.random() * 90000) + 10000}`;

    emailjs
      .send(
        "service_q7wu2qq",
        "template_c1lc8q7",
        {
          to_name: this.props.auth0.user.name,
          booking_id: bookingId,
          room_type: room.name,
          no_of_guests: room.capacity,
          start_date: this.state.startDate,
          end_date: this.state.endDate,
          payment_mode: this.state.paidOnline ? "Paid Online" : "Pay at Hotel",
          price: price,
          to: this.props.auth0.user.email,
        },
        "dKLaTJMgx4aapY2xe"
      )
      .then(
        (result) => {
          console.log(result.text);

          changeContextState("bookedDetails", {
            bookingId: bookingId,
            checkIn: this.state.startDate,
            checkOut: this.state.endDate,
            total: price,
            bookingStatus: "Confirmed",
          });

          changeContextState("paymentDetails", {
            paymentId: this.state.paidOnline
              ? `${Math.floor(Math.random() * 90000) + 10000}`
              : "Pay at Hotel",
            date: new Date().toLocaleDateString(),
            paymentMethod: this.state.paidOnline
              ? `Paid Online`
              : "Pay at Hotel",
            total: price,
            paymentStatus: "Successfull",
          });

          window.location.href = `../${this.state.slug}/confirmation`;
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);

    if (!room) {
      return (
        <div className="error">
          <h3>no such room could be found...</h3>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </div>
      );
    }

    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images,
    } = room;

    return (
      <>
        <div className="single-room-info">
          <article className="desc">
            {!this.state.bookingConfirm && (
              <button
                className="btn-primary"
                style={{ width: "40%" }}
                onClick={() => {
                  this.setState({ bookingConfirm: true });
                }}
              >
                Confirm Booking
              </button>
            )}
            {this.state.bookingConfirm && (
              <div>
                <div className="row mb-4" style={{ textAlign: "center" }}>
                  <label>Please Enter Checkin & Checkout</label>
                </div>
                <div className="row">
                  <div className="col">
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => {
                        this.setState({
                          date: [item.selection],
                          startDate:
                            item.selection.startDate.toLocaleDateString(),
                          endDate: item.selection.endDate.toLocaleDateString(),
                        });
                      }}
                      moveRangeOnFirstSelection={false}
                      ranges={this.state.date}
                    />
                  </div>
                  <div className="col">
                    <Datetime
                      dateFormat={false}
                      timeFormat="HH A"
                      timeConstraints={{ hours: { min: 1, max: 12, step: 1 } }}
                      onChange={(item) =>
                        this.setState({
                          time: item._d
                            .toLocaleTimeString()
                            .replace(/(.*)\D\d+/, "$1"),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </article>
          <article className="info">
            {this.state.bookingConfirm && (
              <div>
                {this.state.loading ? (
                  <img
                    width={"35"}
                    src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
                  />
                ) : (
                  <button
                    className="btn-primary"
                    style={{
                      width: "40%",
                      float: "right",
                      marginRight: "175px",
                    }}
                    onClick={() => {
                      this.setState({ paidOnline: false, loading: true });
                      this.sendEmail(room);
                    }}
                  >
                    Pay at Hotel
                  </button>
                )}
                <PaytmButton
                  callSendEmail={() => {
                    this.setState({ paidOnline: true });
                    this.sendEmail(room);
                  }}
                  price={price}
                />
                <img
                  style={{ width: "75%" }}
                  className="mt-4"
                  src={cards}
                  alt="Beach Resort"
                />
                <img
                  style={{ width: "30%" }}
                  className="mt-4"
                  src={paytm}
                  alt="Beach Resort"
                />
              </div>
            )}
          </article>
        </div>

        <div className="single-room-info">
          <article className="desc">
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>price: ₹{price}</h6>
            <h6>size: {size} SQFT</h6>
            <h6>
              max capacity:
              {capacity > 1 ? `${capacity} people` : `${capacity} person`}
            </h6>
            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
            <h6>{breakfast && "free breakfast included"}</h6>
          </article>
        </div>

        <section className="room-extras">
          <h6>extras</h6>
          <ul className="extras">
            {extras.map((item, index) => {
              return <li key={index}>- {item}</li>;
            })}
          </ul>
        </section>
      </>
    );
  }
}

export default withAuth0(Booking);
