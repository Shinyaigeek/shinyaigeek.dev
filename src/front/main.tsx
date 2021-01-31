import { registerPrefetch } from "./prefetch/prefetcher";
import { registerGitHubCalendar } from "./registerGitHubCalendar";
import { registerPopupState } from "./registerPopupState";

registerPrefetch();

registerGitHubCalendar();

registerPopupState();
