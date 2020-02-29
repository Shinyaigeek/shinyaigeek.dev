import React from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout(children: React.ReactChild) {
  return () => (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
