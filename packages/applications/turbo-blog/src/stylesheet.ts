/**
 * Currently, rspack's mini-css-extract-plugin will not output stylesheet file in node target.
 * So we need a file which includes only pages components to extract stylesheets.
 */

import { Layout } from "./ui/components/Layout/Layout";
import { Home } from "./ui/pages/Home/Home";

Layout;
Home;
