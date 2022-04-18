import React, { Component } from "react";
import Title from "./Title";

import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "free cocktails",
        info: "Dolore dolore nisi anim esse commodo non. Tempor sint reprehenderit cillum aliqua nisi. Sit esse voluptate elit velit est ad. Sunt utullamco aliquip do irure sunt labore",
      },
      {
        icon: <FaHiking />,
        title: "endless hiking",
        info: "Dolore dolore nisi anim esse commodo non. Tempor sint reprehenderit cillum aliqua nisi. Sit esse voluptate elit velit est ad. Sunt utullamco aliquip do irure sunt labore",
      },
      {
        icon: <FaShuttleVan />,
        title: "free shuttle",
        info: "Dolore dolore nisi anim esse commodo non. Tempor sint reprehenderit cillum aliqua nisi. Sit esse voluptate elit velit est ad. Sunt utullamco aliquip do irure sunt labore",
      },
      {
        icon: <FaBeer />,
        title: "strongest beers",
        info: "Dolore dolore nisi anim esse commodo non. Tempor sint reprehenderit cillum aliqua nisi. Sit esse voluptate elit velit est ad. Sunt utullamco aliquip do irure sunt labore",
      },
    ],
  };

  render() {
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map((item) => {
            return (
              <article key={`item-${item.title}`} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
