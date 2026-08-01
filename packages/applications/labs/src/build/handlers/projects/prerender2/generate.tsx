import type { GenerateHandler } from "ssg-router";
import { Prerender2PageComponent } from "../../../../ui/pages/projects/prerender2/prerender2";
import { Prerender2SubPageComponent } from "../../../../ui/pages/projects/prerender2/subpage";
import type { Context } from "../../../context";
import { renderDocument } from "../../../render";

export const generatePrerender2Page: GenerateHandler<Context> = async ({
	context,
}) =>
	renderDocument(<Prerender2PageComponent builtAssets={context.builtAssets} />);

export const generatePrerender2SubPage: GenerateHandler<Context> = async ({
	context,
}) =>
	renderDocument(
		<Prerender2SubPageComponent builtAssets={context.builtAssets} />,
	);
