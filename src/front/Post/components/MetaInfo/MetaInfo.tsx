// import { Edit } from "@zeit-ui/react-icons";

import { DecorationTag } from "../../../components/DecorationTag/DecorationTag";

export function MetaInfo(props: {
  fields: {
    tags: string[];
    title: string;
    publishedAt: string;
  };
}) {
  return (
    <div>
      <h1>{props.fields.title}</h1>
      <div>
        {/* <Edit /> */}
        {props.fields.publishedAt}
      </div>
      <DecorationTag tags={props.fields.tags} />
    </div>
  );
}
