import { Layout } from "../components/Layout/Layout";
import { Entry } from "../../util/getBlogPost";
import { WelcomePage } from "./components/WelcomePage/WelcomePage";
import { Item } from "./components/Item/Item";
import { Pagenation } from "./components/Pagenation/Pagenation";

const Home = (props: {
  items: Entry[];
  prev: number | false;
  next: number | false;
}) => {
  return (
    <div>
      <WelcomePage />
      {props.items.map((item, index) => {
        return (
          <div key={index}>
            <Item {...item.fields} />
          </div>
        );
      })}
      <Pagenation {...props} />
    </div>
  );
};

export default Layout(Home);
