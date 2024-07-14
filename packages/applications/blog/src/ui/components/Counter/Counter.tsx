import { type FunctionComponent, useState } from "react";

export const Counter: FunctionComponent = () => {
	const [count, setCount] = useState(0);

	return (
		<div>
			<h1>Counter</h1>
			<p>{count}</p>
			<button type="button" onClick={() => setCount(count + 1)}>
				Increment
			</button>
		</div>
	);
};
