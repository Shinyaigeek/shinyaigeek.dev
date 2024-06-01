import {
	earth,
	earthX,
	earthY,
	icon,
	monkey,
	monkeyImg,
} from "./Shinyaigeek.module.css";

interface Props {
	css?: string;
}

export const Shinyaigeek = (props: Props) => {
	const { css } = props;
	const additionalStyle = css ?? "";
	return (
		<div className={`${icon} ${additionalStyle}`}>
			<div className={monkey}>
				<img
					src={"/assets/static/icon_transparent.png"}
					className={monkeyImg}
					alt="monkey-icon"
					width="270px"
					height="270px"
				/>
			</div>
			<div className={earth}>
				<div className={earthX}>
					<div className={earthY}>
						<img
							src={"/assets/static/earth.png"}
							alt="earth"
							width="50px"
							height="50px"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
