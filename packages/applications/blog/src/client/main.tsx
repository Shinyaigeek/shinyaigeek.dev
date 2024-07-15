import { i18n } from "@lingui/core";
// allow js
// @ts-ignore
import { messages as ja } from "../locales/ja/messages";
import Home from "./Home/Home";
import Post from "./Post/Post";
import { Profile } from "./Profile/Profile";
import { registerGitHubCalendar } from "./registerGitHubCalendar";
i18n.load("ja", ja);
i18n.activate("ja");

registerGitHubCalendar();

Home;
Profile;
Post;
