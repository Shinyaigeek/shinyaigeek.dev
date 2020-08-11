import { Component } from "solid-js";
import { StarStream } from "../StartStream/StarStream";


export const Top:Component<{}> = () => {
    return (
        <div className="welcome">
          <img className="banana" src="https://storage.cloud.google.com/blog_assets_shinyaigeek/static/banana.png" alt="banana" />
          {/* <ScrollDown />
          <Animation /> */}
          <StarStream />
        </div>
      );
}