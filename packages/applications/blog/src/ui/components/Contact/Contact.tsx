import type { FunctionComponent } from "react";
import { Button } from "../button/button";
import contact from "./contact.module.css";

export const Contact: FunctionComponent = function () {
	return (
		<div className={contact.contact}>
			<a href="/profile" className={contact.contactAnchor}>
				<img
					src={"/assets/static/icon_thatsme.png"}
					className={contact.icon}
					alt="icon"
				/>
			</a>
			しにゃい/Shinyaigeek
			<br />
			エモいをハックしたい
			<br />
			<Button>Contact Me</Button>
			<div className="mySnsBox">
				<div className={contact.sns}>
					{/* biome-ignore lint: reason */}
					<a
						id="twitter"
						href="https://twitter.com/Shinyaigeek"
						className={contact.snsAnchor}
					/>
				</div>
				<div className={contact.sns}>
					{/* biome-ignore lint: reason */}
					<a
						id="github"
						href="https://github.com/Shinyaigeek"
						className={contact.snsAnchor}
					/>
				</div>
				<div className={contact.sns}>
					{/* biome-ignore lint: reason */}
					<a
						id="linkedin"
						href="https://www.linkedin.com/in/shinyaigeek/"
						className={contact.snsAnchor}
					/>
				</div>
			</div>
		</div>
	);
};
