import { loadingStyle } from "./Loading.module.css";

export const Loading = () => {
	return (
		<div className={loadingStyle}>
			{Array(30)
				.fill(0)
				.map((_) => {
					return <div />;
				})}
		</div>
	);
};
