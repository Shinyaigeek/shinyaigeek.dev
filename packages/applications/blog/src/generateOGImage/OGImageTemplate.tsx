import React, { type FunctionComponent } from "react";

interface Props {
	title: string;
	width: number;
	height: number;
	logo: string;
}

const FRAME_BOLD = 48;

export const OGImageTemplate: FunctionComponent<Props> = ({
	title,
	width,
	height,
	logo,
}) => (
	<div
		style={{
			display: "flex",
			width: `${width}px`,
			height: `${height}px`,
			background: "#ffffff",
		}}
	>
		<div
			className="frame"
			style={{
				width: `${0.85 * width}px`,
				height: `${0.85 * height}px`,
				borderRadius: "36px",
				border: `#FFE86A ${FRAME_BOLD}px solid`,
				position: "absolute",
				top: `${0.075 * height + FRAME_BOLD * 0.3}px`,
				left: `${0.075 * width + FRAME_BOLD * 0.15}px`,
			}}
		/>
		<img
			className="logo"
			src={`data:image/png;base64,${logo}`}
			width={420}
			height={320}
			style={{
				left: `${width * 0.925 - 420 - FRAME_BOLD * 0.75}px`,
				top: `${height * 0.925 - 420 - FRAME_BOLD * 0.42}px`,
			}}
			alt="logo"
		/>
		<div
			style={{
				display: "flex",
				fontSize: "108px",
				fontWeight: "bold",
				fontFamily: "Roboto",
				width: "70vw",
				height: "70vh",
				top: `${0.2 * height}px`,
				right: "84px",
			}}
		>
			{title}
		</div>
		<div
			style={{
				display: "flex",
				backgroundImage: "linear-gradient(to right, #ff6abb, #ffffff)",
				height: "18px",
				width: `${width * 0.4}px`,
				position: "absolute",
				top: `${0.78 * height}px`,
				left: `${width * 0.2}px`,
				borderRadius: "9px",
			}}
		/>
		<div
			style={{
				display: "flex",
				fontSize: "64px",
				fontWeight: "normal",
				fontFamily: "Roboto",
				top: `${0.8 * height}px`,
				left: `${width * 0.2}px`,
				position: "absolute",
			}}
		>
			shinyaigeek.dev
		</div>
	</div>
);
