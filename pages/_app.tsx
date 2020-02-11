import { NextPage } from "next";
import NextApp from "next/app";
import React, { Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Tags from "../components/Tags";

import { PageInfo, header } from "./post/[item]";

import { initGA, logPageView } from "../utils/analytics.js";

import CookieConsent from "react-cookie-consent";

interface State {
  showHamburgerMenu: boolean;
  showContactModal: boolean;
}

class App extends NextApp<PageInfo & { headers: header[] }, {}, State> {
  constructor(props: PageInfo) {
    // @ts-ignore
    super(props);
    this.state = {
      showHamburgerMenu: false,
      showContactModal: false
    };

    this.setShowContactModal = this.setShowContactModal.bind(this);
    this.setShowHamburgerMenu = this.setShowHamburgerMenu.bind(this);
  }
  setShowHamburgerMenu() {
    this.setState({
      ...this.state,
      showHamburgerMenu: !this.state.showHamburgerMenu
    });
  }
  setShowContactModal() {
    this.setState({
      ...this.state,
      showContactModal: !this.state.showContactModal
    });
  }

  componentDidMount() {
    // @ts-ignore
    if (!window.GA_INITIALIZED) {
      initGA();
      // @ts-ignore
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  render() {
    const { Component } = this.props;
    return (
      <Fragment>
        <Header
          setShowContactModal={this.setShowContactModal}
          showContactModal={this.state.showContactModal}
          setShowHamburgerMenu={this.setShowHamburgerMenu}
          showHamburgerMenu={this.state.showHamburgerMenu}
        />
        <div
          style={{
            position: "relative",
            top: "72px"
          }}
        >
          <Component
            {...this.props.pageProps}
            {...this.props.headers}
            setShowContactModal={this.setShowContactModal}
          />
        </div>
        <Tags />
        <Footer />
        <CookieConsent
					location="bottom"
					acceptOnScroll={true}
					buttonText="I understand"
					declineButtonText="I decline"
					cookieName="myAwesomeCookieName2"
					style={{ background: "#2B373B" }}
					buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
					expires={150}
				>
					This website uses cookies to enhance the user experience.{" "}
					<span style={{ fontSize: "10px" }}>
						This bit of text is smaller :O
					</span>
				</CookieConsent>
      </Fragment>
    );
  }
}

export default App;
