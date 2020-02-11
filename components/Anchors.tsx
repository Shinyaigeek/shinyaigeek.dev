import React, { useState } from "react";
import { Anchor, Dropdown, Icon } from "antd";

const { Link } = Anchor;

export default function Anchors(props: { headings: string[] }) {
  const [showHeadings, setShowHeadings] = useState(false);
  function Headings() {
    return (
      <Anchor offsetTop={108} onClick={() => setShowHeadings(false)}>
        {props.headings.map((heading,index) => {
          const cont = heading
            .replace(/<h2 id=".+?">/, "")
            .replace("</h2>", "");
          return (
            <Link
              href={`#${encodeURI(cont.toLowerCase()).replace(/%20/g, "-")}`}
              title={`${cont}`}
              key={`anchor__${index}`}
            />
          );
        })}
      </Anchor>
    );
  }
  return (
    <div
      style={{
        position: "fixed",
        top: "72px",
        fontSize: "22px",
        zIndex:1050
      }}
    >
      <Dropdown
        visible={showHeadings}
        overlay={() => <Headings />}
        overlayStyle={{
          position: "fixed",
          top: "72px"
        }}
      >
        <div onClick={() => setShowHeadings(!showHeadings)} style={{
            background:"#fff",
            height:"35px",
            padding:"2px 4px"
        }}>
          {showHeadings ? (
            <Icon type="up-circle" />
          ) : (
            <Icon type="down-circle" />
          )}
          目次
        </div>
      </Dropdown>
    </div>
  );
}
