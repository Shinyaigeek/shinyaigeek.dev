import { ShinyaigeekAnimation } from "../../../components/ShinyaigeekAnimation/ShinyaigeekAnimation";
import { ScrollDown } from "../ScrollDown/ScrollDown";
import { StarStream } from "../StartStream/StarStream";

export function WelcomePage() {
  return (
    <div className="welcome">
      <img className="banana" src="https://storage.cloud.google.com/blog_assets_shinyaigeek/static/banana.png" alt="banana" />
      <ScrollDown />
      <ShinyaigeekAnimation />
      <StarStream />
    </div>
  );
}
