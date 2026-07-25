import type { FunctionComponent, ReactNode } from "react";
import {
	action,
	description as descriptionClass,
	eyebrow,
	header,
	section,
	title as titleClass,
	titleGroup,
} from "./section.module.css";

interface Props {
	/** Small uppercase label above the heading. */
	eyebrow?: string;
	title: string;
	description?: string;
	/** Optional "see all" style link rendered on the right of the heading row. */
	action?: {
		href: string;
		label: string;
	};
	id?: string;
	children: ReactNode;
}

export const Section: FunctionComponent<Props> = ({
	eyebrow: eyebrowText,
	title,
	description,
	action: actionProp,
	id,
	children,
}) => (
	<section className={section} id={id}>
		<div className={header}>
			<div className={titleGroup}>
				{eyebrowText && <span className={eyebrow}>{eyebrowText}</span>}
				<h2 className={titleClass}>{title}</h2>
			</div>
			{actionProp && (
				<a className={action} href={actionProp.href}>
					{actionProp.label} →
				</a>
			)}
		</div>
		{description && <p className={descriptionClass}>{description}</p>}
		{children}
	</section>
);
