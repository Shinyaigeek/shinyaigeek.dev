import { t } from "@lingui/macro";
import React from "react";
import languageStyle from "./Language.module.scss";

interface Props {
  currentLanguage: language;
  currentPath: string;
}

export type language = "ja" | "en";
// TODO
export const languages = new Map<
  language,
  {
    name: string;
    icon: JSX.Element;
  }
>();
languages.set("ja", {
  name: "日本語",
  icon: (
    <g-emoji fallback-src="/assets/static/jp.png" alias="Japan">
      🇯🇵
    </g-emoji>
  ),
});
languages.set("en", {
  name: "English",
  icon: (
    <span>
      <g-emoji fallback-src="/assets/static/us.png" alias="America">
        🇺🇸
      </g-emoji>
      <g-emoji fallback-src="/assets/static/gb.png" alias="United States">
        🇬🇧
      </g-emoji>
    </span>
  ),
});

export const Language: React.FC<Props> = function ({
  currentLanguage,
  currentPath,
}) {
  return (
    <details>
      <summary>
        {" "}
        <span role="img" aria-label="language">
          <g-emoji fallback-src="/assets/static/earth_africa.png" alias="earth">
            🌍
          </g-emoji>
        </span>{" "}
        {t`current_language`}
      </summary>
      <div className={languageStyle.languageWrapper}>
        {Array.from(languages.keys()).map((language) => {
          return (
            <a
              key={language}
              href={`${
                language === "en"
                  ? "https://ja.shinyaigeek.dev"
                  : "http://en.shinyaigeek.dev"
              }${currentPath}`}
              className={`${languageStyle.language} ${
                language === currentLanguage ? languageStyle.active : ""
              }`}
            >
              <span role="img" aria-label="country">
                {languages.get(language)!.icon}
              </span>
              {languages.get(language)!.name}
            </a>
          );
        })}
      </div>
    </details>
  );
};
