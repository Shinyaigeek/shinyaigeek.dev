import type { FunctionComponent } from "react";
import { stars, startStreamStyle } from "./StarStream.module.css";

export const StarStream: FunctionComponent = () => (
	<div className={startStreamStyle}>
		{[...Array(25)].map((_, i) => (
			// biome-ignore lint/suspicious/noArrayIndexKey: index as key is ok in this context
			<div key={i} className={stars} />
		))}
	</div>
);
