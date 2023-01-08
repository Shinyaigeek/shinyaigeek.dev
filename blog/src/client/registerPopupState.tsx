import Home from "./Home/Home";
import Post from "./Post/Post";
import { path2prefetchPath } from "./prefetch/path2prefetchPath";
import { __shinyaigeek_prefetch } from "./prefetch/prefetcher";
import { Profile } from "./Profile/Profile";
import { registerGitHubCalendar } from "./registerGitHubCalendar";

export const registerPopupState = () => {
	if (!window.onpopstate) {
		window.onpopstate = () => {
			if (document.location.hash.length > 0) {
				return;
			}
			switch (document.location.pathname) {
				case "/": {
					if (__shinyaigeek_prefetch["home"]) {
						document.title = "shinyaigeek.dev";
						<Home
							items={__shinyaigeek_prefetch["home"].items}
							prev={__shinyaigeek_prefetch["home"].prev}
							next={__shinyaigeek_prefetch["home"].next}
						/>;
					} else {
						location.assign("/");
					}
					break;
				}

				case "/profile": {
					document.title = "プロフィール | shinyaigeek.dev";
					<Profile />;
					registerGitHubCalendar();
					break;
				}

				default: {
					const pathname = document.location.pathname;
					if (pathname.startsWith("/post")) {
						const prefetchPath = path2prefetchPath(pathname);
						if (prefetchPath) {
							if (__shinyaigeek_prefetch[prefetchPath]) {
								document.title = __shinyaigeek_prefetch[prefetchPath].title;
								console.log(__shinyaigeek_prefetch[prefetchPath]);
								<Post fields={__shinyaigeek_prefetch[prefetchPath].fields} />;
								break;
							}
						}
					}

					location.assign(pathname);
				}
			}
		};
	}
};
