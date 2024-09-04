import { createContext } from "react";
type language = "ja" | "en";

export const LanguageContext = createContext<language>("ja");
