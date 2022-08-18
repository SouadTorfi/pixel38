import React from "react";
import "./Home.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import HomeImage from "../../images/about-cargo.png";

function Home() {
  return (
    <div className="home">
      <Header />
      <div className="homePage">
        <div className="home-image">
          <img src={HomeImage} />
        </div>
        <div className="homeParagraphe">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
