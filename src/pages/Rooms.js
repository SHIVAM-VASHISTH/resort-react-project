import React from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import RoomContainer from "../components/RoomContainer";
import Hero from "../components/Hero";
import { RoomConsumer } from "../context";

const Rooms = () => {
  return (
    <>
      <Hero hero="roomsHero">
        <Banner title="our rooms">
          <Link to="/" className="btn-primary">
            return home
          </Link>
        </Banner>
      </Hero>
      <RoomContainer />
    </>
  );
};

export default Rooms;
