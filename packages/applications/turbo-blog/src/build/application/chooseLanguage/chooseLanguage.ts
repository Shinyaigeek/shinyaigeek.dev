import { type Result, createErr, createOk } from "option-t/esm/PlainResult";
import { Language } from "../../model/language/language.entity";

export const chooseLanguage: (language: string) => Result<Language, Error> = (
	language,
) => {
	switch (language) {
		case "ja":
			return createOk(Language.ja);
		case "en":
			return createOk(Language.en);
		default:
			return createErr(new Error(`Invalid language: ${language}`));
	}
};
