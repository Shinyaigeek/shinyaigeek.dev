import type { FunctionComponent } from "react";
import { stars, startStreamStyle } from "./StarStream.module.css";

export const StarStream: FunctionComponent = () => (
	<div className={startStreamStyle}>
		{[...Array(25)].map((_, i) => (
			// oxlint-disable-next-line react/no-array-index-key -- a fixed number of decorative stars that never reorder
			<div key={i} className={stars} />
		))}
	</div>
);
