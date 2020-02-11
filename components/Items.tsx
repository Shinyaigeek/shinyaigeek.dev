import React, { useEffect } from "react";

import { Result, Button, Pagination, BackTop } from "antd";
import { header } from "../pages/post/[item]";
import ItemList from "../components/ItemList";
import Link from "next/link";

interface Props {
  headers: header[];
  totalItem: number;
}

export default function Items(props: Props) {

  return (
    <div className="home--items" id="home--items">
      {props.headers.length !== 0 &&
        props.headers.map((header, index) => {
          return <ItemList {...header} key={`itemlist__${index}`} />;
        })}
      {props.headers.length === 0 && (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Link href="/">
              <Button type="primary">Back Home</Button>
            </Link>
          }
        />
      )}
    </div>
  );
}
