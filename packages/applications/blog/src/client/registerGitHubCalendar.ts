//@ts-ignore
import GitHubCalendar from 'github-calendar';

export const registerGitHubCalendar = () => {
    if (location.pathname === '/profile') {
        GitHubCalendar('.ghCalender', 'shinyaigeek', {
            responsive: true,
            cache: 86400,
        });
    }
};
