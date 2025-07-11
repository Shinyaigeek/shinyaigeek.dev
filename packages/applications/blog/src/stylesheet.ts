/**
 * Currently, rspack's mini-css-extract-plugin will not output stylesheet file in node target.
 * So we need a file which includes only pages components to extract stylesheets.
 */

import { Layout } from "./ui/components/Layout/Layout";
import { Home } from "./ui/pages/Home/Home";
import { Post } from "./ui/pages/Post/Post";
import { PostIndex } from "./ui/pages/PostIndex/PostIndex";
import { Profile } from "./ui/pages/Profile/Profile";
import { FleetDetail } from "./ui/pages/fleet-detail/fleet-detail";
import { FleetIndex } from "./ui/pages/fleet-index/fleet-index";

Layout;
Home;
Post;
Profile;
PostIndex;
FleetIndex;
FleetDetail;
