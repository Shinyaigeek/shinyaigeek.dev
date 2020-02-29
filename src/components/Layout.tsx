import React from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout(Component: (props?:any) => JSX.Element) {
  return (props?:any) => (
    <div>
      <Header />
      <Component {...props} />
      <Footer />
    </div>
  );
}
