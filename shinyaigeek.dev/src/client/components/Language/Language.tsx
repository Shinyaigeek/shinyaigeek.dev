import React from "react";
import language from "./Language.module.scss";

interface Props {
  currentLanguage: "ja" | "en";
}

export const Language: React.FC<Props> = function ({ currentLanguage }) {
  return (
    <details>
      <summary>
        {" "}
        <span role="img" aria-label="language">
          🌎
        </span>{" "}
      </summary>
    </details>
  );
};
