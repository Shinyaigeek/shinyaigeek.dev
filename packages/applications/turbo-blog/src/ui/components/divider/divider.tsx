import type { FunctionComponent } from "react";
import { divider } from "./divider.module.css";

export const Divider: FunctionComponent = function () {
	return <div className={divider} />;
};
