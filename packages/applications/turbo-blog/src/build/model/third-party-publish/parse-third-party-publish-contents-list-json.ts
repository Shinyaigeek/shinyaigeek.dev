import { isNull } from "option-t/esm/Nullable";
import {
	type Result,
	createErr,
	createOk,
	isErr,
	unwrapOk,
} from "option-t/esm/PlainResult";
import { isUndefined } from "option-t/esm/Undefinable";
import type { ThirdPartyPublishContent } from "./third-party-publish.entity";

export const parseThirdPartyPublishContentsListJson: (
	fileContent: string,
) => Result<ThirdPartyPublishContent[], Error> = (fileContent) => {
	const thirdPartyPublishContentsListResult = (() => {
		try {
			return createOk(JSON.parse(fileContent));
		} catch (e) {
			return createErr(e as Error);
		}
	})();

	if (isErr(thirdPartyPublishContentsListResult)) {
		return thirdPartyPublishContentsListResult;
	}

	const thirdPartyPublishContentsList = unwrapOk(
		thirdPartyPublishContentsListResult,
	);

	if (!Array.isArray(thirdPartyPublishContentsList)) {
		return createErr(new Error("third-pirty.json should be the list"));
	}

	const results: Result<ThirdPartyPublishContent, Error>[] =
		thirdPartyPublishContentsList.map((thirdPartyPublishContent) => {
			if (
				isUndefined(thirdPartyPublishContent) ||
				isNull(thirdPartyPublishContent) ||
				typeof thirdPartyPublishContent !== "object"
			) {
				return createErr(
					new Error("thirdpirty.json's element should be object"),
				);
			}

			return createOk(thirdPartyPublishContent as ThirdPartyPublishContent);
		});

	const errors = results.filter((result) => isErr(result));
	if (errors.length > 0) {
		return createErr(new AggregateError(errors));
	}

	return createOk(results.map((result) => unwrapOk(result)));
};
