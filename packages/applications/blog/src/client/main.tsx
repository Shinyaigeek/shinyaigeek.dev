import { i18n } from '@lingui/core';
import { registerGitHubCalendar } from './registerGitHubCalendar';
import { registerPopupState } from './registerPopupState';
// allow js
// @ts-ignore
import { messages as ja } from '../locales/ja/messages';
i18n.load('ja', ja);
i18n.activate('ja');

registerGitHubCalendar();

registerPopupState();
