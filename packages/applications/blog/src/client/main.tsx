import { i18n } from '@lingui/core';
import { registerGitHubCalendar } from './registerGitHubCalendar';
// allow js
// @ts-ignore
import { messages as ja } from '../locales/ja/messages';
import Home from './Home/Home';
import { Profile } from './Profile/Profile';
import Post from './Post/Post';
i18n.load('ja', ja);
i18n.activate('ja');

registerGitHubCalendar();

Home;
Profile;
Post;