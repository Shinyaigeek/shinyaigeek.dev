import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import React from "react";
import * as layout from "./Layout.module.scss";

export function Layout(Component: (props?: any) => JSX.Element) {
  return (props?: any) => (
    <div className={layout.root}>
      <Header />
      <div className={layout.inner}>
        <Component {...props} />
      </div>
      <Footer />
    </div>
  );
}