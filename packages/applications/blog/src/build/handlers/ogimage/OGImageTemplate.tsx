import React, { type FunctionComponent } from "react";

interface Props {
	title: string;
	width: number;
	height: number;
	logo: string;
}

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
			background:
				"linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
			position: "relative",
			overflow: "hidden",
		}}
	>
		{/* Background pattern */}
		<div
			style={{
				position: "absolute",
				width: "200%",
				height: "200%",
				top: "-50%",
				left: "-50%",
				background: `
					radial-gradient(circle at 20% 50%, rgba(255, 232, 106, 0.3) 0%, transparent 50%),
					radial-gradient(circle at 80% 80%, rgba(255, 204, 0, 0.2) 0%, transparent 50%),
					radial-gradient(circle at 40% 80%, rgba(255, 244, 154, 0.2) 0%, transparent 50%)
				`,
			}}
		/>

		{/* Grid overlay */}
		<div
			style={{
				position: "absolute",
				width: "100%",
				height: "100%",
				backgroundImage: `
					linear-gradient(rgba(255, 232, 106, 0.03) 1px, transparent 1px),
					linear-gradient(90deg, rgba(255, 232, 106, 0.03) 1px, transparent 1px)
				`,
				backgroundSize: "60px 60px",
			}}
		/>

		{/* Title container */}
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "flex-start",
				padding: `${height * 0.1}px ${width * 0.08}px`,
				width: "100%",
				height: "100%",
				position: "relative",
				zIndex: 10,
			}}
		>
			{/* Main title */}
			<div
				style={{
					fontSize: "96px",
					fontWeight: "800",
					fontFamily: "Roboto",
					color: "#ffffff",
					lineHeight: 1.2,
					maxWidth: "75%",
					width: "75%",
					marginBottom: "48px",
					letterSpacing: "-2px",
					wordWrap: "break-word",
					overflow: "hidden",
					display: "flex",
					flexWrap: "wrap",
				}}
			>
				{title}
			</div>

			{/* Accent bar */}
			<div
				style={{
					display: "flex",
					height: "12px",
					width: "180px",
					background:
						"linear-gradient(90deg, #FFE86A 0%, #FFC700 50%, #FFE86A 100%)",
					borderRadius: "6px",
					marginBottom: "36px",
					boxShadow: "0 0 30px rgba(255, 232, 106, 0.6)",
				}}
			/>

			{/* Website name with yellow accent */}
			<div
				style={{
					position: "relative",
					display: "flex",
				}}
			>
				{/* Glow background for text */}
				<div
					style={{
						position: "absolute",
						fontSize: "60px",
						fontWeight: "900",
						fontFamily: "Roboto",
						color: "#FFE86A",
						letterSpacing: "2px",
						textTransform: "uppercase",
						filter: "blur(8px)",
						opacity: 0.8,
					}}
				>
					SHINYAIGEEK.DEV
				</div>
				<div
					style={{
						position: "absolute",
						fontSize: "60px",
						fontWeight: "900",
						fontFamily: "Roboto",
						color: "#FFC700",
						letterSpacing: "2px",
						textTransform: "uppercase",
						filter: "blur(16px)",
						opacity: 0.6,
					}}
				>
					SHINYAIGEEK.DEV
				</div>
				{/* Main text */}
				<div
					style={{
						position: "relative",
						fontSize: "60px",
						fontWeight: "900",
						fontFamily: "Roboto",
						background:
							"linear-gradient(135deg, #FFE86A 0%, #FFC700 50%, #FFED4E 100%)",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
						backgroundClip: "text",
						letterSpacing: "2px",
						textTransform: "uppercase",
						zIndex: 10,
					}}
				>
					SHINYAIGEEK.DEV
				</div>
			</div>
		</div>

		{/* Logo container with yellow accent */}
		<div
			style={{
				position: "absolute",
				bottom: `${height * 0.08}px`,
				right: `${width * 0.08}px`,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "180px",
				height: "180px",
				background:
					"linear-gradient(135deg, rgba(255, 232, 106, 0.1) 0%, rgba(255, 199, 0, 0.1) 100%)",
				borderRadius: "24px",
				backdropFilter: "blur(10px)",
				border: "2px solid rgba(255, 232, 106, 0.3)",
				boxShadow: "0 0 30px rgba(255, 232, 106, 0.2)",
			}}
		>
			<img
				src={`data:image/png;base64,${logo}`}
				width={140}
				height={140}
				style={{
					filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))",
				}}
				alt="logo"
			/>
		</div>

		{/* Decorative elements with yellow theme */}
		<div
			style={{
				position: "absolute",
				top: "-100px",
				right: "-100px",
				width: "300px",
				height: "300px",
				borderRadius: "50%",
				background:
					"radial-gradient(circle, rgba(255, 232, 106, 0.4) 0%, transparent 70%)",
				filter: "blur(60px)",
			}}
		/>
		<div
			style={{
				position: "absolute",
				bottom: "-150px",
				left: "-150px",
				width: "400px",
				height: "400px",
				borderRadius: "50%",
				background:
					"radial-gradient(circle, rgba(255, 199, 0, 0.3) 0%, transparent 70%)",
				filter: "blur(80px)",
			}}
		/>

		{/* Additional yellow accent element */}
		<div
			style={{
				position: "absolute",
				top: "50%",
				right: "0",
				width: "600px",
				height: "2px",
				background:
					"linear-gradient(90deg, transparent 0%, rgba(255, 232, 106, 0.3) 50%, transparent 100%)",
				transform: "translateY(-50%)",
			}}
		/>
	</div>
);
