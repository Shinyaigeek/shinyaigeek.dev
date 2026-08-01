import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

/**
 * renderToStaticMarkup emits the <html> element but not the doctype in front
 * of it, and a document served without one puts the browser into quirks mode.
 */
export const renderDocument = (element: ReactElement) =>
	`<!DOCTYPE html>${renderToStaticMarkup(element)}`;
