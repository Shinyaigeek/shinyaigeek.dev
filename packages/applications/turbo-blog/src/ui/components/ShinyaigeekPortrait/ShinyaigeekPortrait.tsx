import {
	earth,
	earthX,
	earthY,
	shinyaigeekPortrait,
	shinyaigeekPortraitContainer,
	shinyaigeekPortraitImage,
} from "./ShinyaigeekPortrait.module.css";

interface Props {
	css?: string;
}

export const ShinyaigeekPortrait = (props: Props) => {
	const { css } = props;
	const additionalStyle = css ?? "";
	return (
		<div className={`${shinyaigeekPortrait} ${additionalStyle}`}>
			<div className={shinyaigeekPortraitContainer}>
				<img
					src={"/assets/static/shinyaigeek_portrait_transparent.png"}
					className={shinyaigeekPortraitImage}
					alt="shinyaigeek's portrait icon"
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
