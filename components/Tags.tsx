import React from "react";
import { Tag } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

type Tags = {
  tagName: string;
  tagNameEn: string;
  tagColor: string;
};
type Prop = {
  props: Tags[];
};

const tags = [
  {
    tagName: "競プロ",
    tagNameEn: "Code",
    tagColor: "orange"
  },
  {
    tagName: "Python",
    tagNameEn: "Python",
    tagColor: "blue"
  },
  {
    tagName: "プログラミング",
    tagNameEn: "Programing",
    tagColor: "cyan"
  },
  {
    tagName: "C/C++",
    tagNameEn: "C/C++",
    tagColor: "green"
  },
  {
    tagName: "JavaScript",
    tagNameEn: "JavaScript",
    tagColor: "volcano"
  },
  {
    tagName: "ブログ",
    tagNameEn: "Blog",
    tagColor: "magenta"
  },
  {
    tagName: "ポエム",
    tagNameEn: "Poem",
    tagColor: "lime"
  },
  {
    tagName: "React",
    tagNameEn: "React",
    tagColor: "geekblue"
  }
];

export default function Tags() {
  return (
    <div
      className="tags"
      style={{
        width: "80%",
        margin: "45px auto 6px auto"
      }}
    >
      {tags.map((tag: Tags, index: number) => (
        <Link href={`/?tag=${tag.tagNameEn}`} key={`tag__${index}`}>
          <div
            style={{
              display: "inline-block"
            }}
          >
            <Tag
              color={tag.tagColor}
              id={tag.tagNameEn}
              style={{
                fontSize: 24,
                width: "minContent",
                padding: "5px 8px",
                margin: "3px 5px"
              }}
              key={`anchor--tag__${index}`}
            >
              {tag.tagName}
            </Tag>
          </div>
        </Link>
      ))}
    </div>
  );
}
