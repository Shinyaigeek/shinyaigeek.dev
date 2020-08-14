import { Component } from "solid-js";
import { StarStream } from "../StartStream/StarStream";
import { ScrollDown } from "../ScrollDown/ScrollDown";
import { Animation } from "../Animation/Animation";


export const Top:Component<{}> = () => {
    return (
        <div className="welcome">
          <img className="banana" src="https://storage.cloud.google.com/blog_assets_shinyaigeek/static/banana.png" alt="banana" />
          <ScrollDown />
          <Animation />
          <StarStream />
        </div>
      );
}