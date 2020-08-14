import { Component } from "solid-js";
import { HomeProps } from "../../pages/Home";
import { Meta } from "../../utils/makeIndex/makeIndex";

export const Post: Component<Meta> = (props) => {
  return (
    <>
      <div className="item--home">
        <a className="item--home__anchor" href={`/post/${props.slug}`}>
          <div className="title">{props.name}</div>
        </a>
        <Divider />
        <div className="date">{props.date}</div>
        <div className="tags"></div>
        <div>{props.description}</div>
        <div className="read--more">
          <a
            className="item--home__anchor read--more__anchor"
            href={`/post/${props.slug}`}>
            <Button id="more-button">MORE</Button>
          </a>
        </div>
      </div>
      <style jsx>
        {`
          .item--home__anchor {
            color: var(--theme-color);
            text-decoration: none;
            display: inline-block;
          }

          .item--home {
            min-width: 300px;
            width: 80%;
            max-width: 750px;
            margin: 12px auto;
          }

          .title {
            font-size: 32px;
            text-align: center;
            font-weight: bold;
            padding: 8px 12px;
          }

          .date {
            color: #8fff9e;
            padding: 16px 6px;
            font-size: 18px;
          }

          .read--more__anchor {
            margin: 16px 0;
            position: absolute;
            right: 24px;
          }

          .read--more {
            position: relative;
            margin: 4px 0;
            height: 64px;
          }
        `}
      </style>
    </>
  );
};
