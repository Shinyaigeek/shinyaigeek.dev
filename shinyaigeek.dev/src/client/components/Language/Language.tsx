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
    icon: string;
  }
>();
languages.set("ja", {
  name: "日本語",
  icon: "🇯🇵",
});
languages.set("en", {
  name: "English",
  icon: "🇺🇸 🇬🇧",
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
          🌎
        </span>{" "}
        {t`current_language`}
      </summary>
      {Array.from(languages.keys()).map((language) => {
        return (
          <a
            key={language}
            href={`${
              language === "en"
                ? "https://ja.shinyaigeek.dev"
                : "http://en.shinyaigeek.dev"
            }${currentPath}`}
            className={language === currentLanguage ? languageStyle.active : ""}
          >
            <span role="img" aria-label="country">
              {languages.get(language)!.icon}
            </span>
            {languages.get(language)!.name}
          </a>
        );
      })}
    </details>
  );
};
