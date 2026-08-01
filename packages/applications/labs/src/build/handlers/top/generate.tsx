import type { GenerateHandler } from "ssg-router";
import { TopPageComponent } from "../../../ui/pages/top/top";
import type { Context } from "../../context";
import { PROJECTS } from "../../projects";
import { renderDocument } from "../../render";

export const generateTopPage: GenerateHandler<Context> = async ({ context }) =>
	renderDocument(
		<TopPageComponent
			allProjects={PROJECTS}
			builtAssets={context.builtAssets}
		/>,
	);
