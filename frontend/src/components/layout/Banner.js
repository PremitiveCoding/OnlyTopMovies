import React from "react";
import { Route } from "react-router-dom";
import Search from "./Search";

const Banner = () => {
  return (
    <div>
      <div class="hero-area hero-style-one">
        <div
          style={{
            backgroundImage: "url('/images/banner/bg1.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "absolute",
            inset: " 0",
            zIndex: "-1",
          }}
        ></div>
        <div class="container">
          <div class="hero-content-wrap">
            <h2>Enjoy Your Favirote Movie With The Best Quality</h2>
            <p>ICinema</p>

            <Route render={({ history }) => <Search history={history} />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
