/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 104:
/***/ ((module) => {

/*eslint-disable*/ module.exports = {
	messages: {
		aboutme_content:
			"こんにちは、こんばんは、しにゃいと申します。<br />Web Developerとして活動しております。<br /><br />Webというプラットフォームの普遍性に惹かれていて、その可能性を広げていくための活動をしております。この活動を通して、Webの可能性を人々に伝えていきたいと思っています。<br /><br />「どこでもいつでも誰にでも」を標語として掲げ、Webの普遍性を最大限に引き出すために、クライアントマシンのスペックが低くてもアプリケーションが動くようにクライアントマシンのRuntime Costを下げたり、クライアントマシンの通信状況が悪くてもアプリケーションが動くようにI/O Costを下げたり、目の見えない人や認知障害の人はもちろん、料理や筋トレで手が不自由な人でもコンテンツにアクセスできるように、アクセシビリティを考慮したコードを書いたりしています。この意志を実現するために、Webフロントエンドだけでなく、CDN Edge Proxy、サーバーサイドなど、幅広くWeb開発に携わってきました。<br /><br />趣味はWebとプログラミングです。趣味で自作ブラウザを作ったり、parcel-bundlerの優れたスケーラビリティ（Transformer, Resolver, Pipeline, ...）とWeb開発へのカバレッジ（TypeScript, Vue, React, Scss, CoffeeScript ...）に惚れ込み、parcel-bundlerにcontributeしています。<br /><br />現在、積極的に仕事を探しているわけではありませんが、Web開発職の副業に関するメッセージは大歓迎です!",
		certain_news_media_company: "某メディア企業",
		certain_news_media_company_description:
			"フロントエンドエンジニアとして, Web Frontend文脈でのパフォーマンス改善, インテラクティブなアプリケーション開発に従事する.",
		certain_news_media_company_position: "Webエンジニア",
		current_language: "日本語",
		cybozu: "Cybozu",
		cybozu_description:
			"学生インターンとして, チームを組みkintoneででの協働をより補強する拡張機能の開発を行う.",
		cybozu_position: "Internship Student",
		education: "学歴",
		enroll_univ_tokyo: "東京大学入学",
		graduate_nishiyamato: "西大和学園高等学校卒業",
		graduate_utokyo: "東京大学工学部システム創成学科卒業",
		index: "目次",
		major_in_system: "東京大学工学部システム創成学科進学",
		moshimos: "MOSHIMOS",
		moshimos_description:
			"Webエンジニアとしてアプリケーション開発に従事する. バックエンドからフロントエンドまで, 幅広く担当.",
		moshimos_position: "Web Engineer",
		recruit: "Recruit",
		recruit_description:
			"フロントエンドのUI改善, Web 標準動向の調査を行なっていました.",
		recruit_position: "Web Engineer",
		voyage_group: "VOYAGE GROUP",
		voyage_group_description:
			"TreasureでWeb Application開発のいろはを学び, その後チームを組んでバックエンドはfirebase, go, フロントエンドはPreact, bootstrapでブログ投稿プラットフォームの開発を行っていました.",
		voyage_group_position: "Treasure Internship Student",
		wantedly: "Wantedly",
		wantedly_description: "Wentedly Webアプリの新機能開発.",
		wantedly_position: "Web Engineer",
		will_major_in_system: "東京大学工学部システム創成学科内定",
		working_experience: "職歴",
	},
};


/***/ }),

/***/ 861:
/***/ ((module) => {

"use strict";


function gen(add) {
    return function _(d, count, what) {
        count = add * count;
        switch (what) {
            case "years":
            case "year":
                d.setFullYear(d.getFullYear() + count);
                break;
            case "months":
            case "month":
                d.setMonth(d.getMonth() + count);
                break;
            case "weeks":
            case "week":
                return _(d, count * 7, "days");
                break;
            case "days":
            case "day":
                d.setDate(d.getDate() + count);
                break;
            case "hours":
            case "hour":
                d.setHours(d.getHours() + count);
                break;
            case "minutes":
            case "minute":
                d.setMinutes(d.getMinutes() + count);
                break;
            case "seconds":
            case "second":
                d.setSeconds(d.getSeconds() + count);
                break;
            case "milliseconds":
            case "millisecond":
                d.setMilliseconds(d.getMilliseconds() + count);
                break;
            default:
                throw new Error("Invalid range: " + what);
        }
        return d;
    };
}

module.exports = {
    add: gen(1),
    subtract: gen(-1)
};

/***/ }),

/***/ 137:
/***/ ((module) => {

/*!
 * days <https://github.com/jonschlinkert/days>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

// English
module.exports.en = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
module.exports.en.abbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
module.exports.en.short = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// French translation
module.exports.fr = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
module.exports.fr.abbr = ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'];
module.exports.fr.short = ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'];

// Spanish translation
module.exports.es = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
module.exports.es.abbr = ['dom', 'lun', 'mar', 'mir', 'jue', 'vie', 'sab'];
module.exports.es.short = ['do', 'lu', 'ma', 'mi', 'ju', 'vi', 'sa'];

// Italian translation
module.exports.it = ['Domenica', 'Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato'];
module.exports.it.abbr = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
module.exports.it.short = ['D', 'L', 'Ma', 'Me', 'G', 'V', 'S'];

// In order not to break compatibility
module.exports = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
module.exports.abbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
module.exports.short = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];


/***/ }),

/***/ 372:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var iterateObj = __webpack_require__(996),
    sliced = __webpack_require__(474);

/**
 * elly
 * Selects the DOM elements based on the provided selector. If there is no
 * commonjs/module environment, the `$` global variable will be created.
 *
 * @name elly
 * @function
 * @param {String|HTMLElement} input The element selector (e.g.
 * `'#my-id > .my-class'`), the element tag you want to create
 * (e.g. `'<ul>'`) or the HTML element (will be returned by the function).
 * @param {Object|HTMLElement} contextOrAttributes
 * @returns {HTMLElement} The HTMLElement that was provided or selected.
 */
function $(input, contextOrAttributes) {
    if (typeof input === "string") {
        if (input.charAt(0) === "<") {
            input = document.createElement(input.slice(1, -1));
            iterateObj(contextOrAttributes || {}, function (value, name) {

                switch (name) {
                    case "text":
                        input.textContent = value;
                        return;
                    case "html":
                        input.innerHTML = value;
                        return;
                }

                input.setAttribute(name, value);
            });
            return input;
        } else {
            contextOrAttributes = contextOrAttributes || document;
            return contextOrAttributes.querySelector(input);
        }
    }
    return input;
};

/**
 * elly.$$
 * Selects multiple elements. Note that if there is no commonjs/module environment, you will access this function using `$.$$`.
 *
 * @name elly.$$
 * @function
 * @param {String} selector The DOM query selector.
 * @param {HTMLElement} context The element context/container. Defaults to `document`.
 * @returns {Array} The array of elements.
 */
$.$$ = function (selector, context) {
    if (typeof selector === "string") {
        context = context || document;
        return sliced(context.querySelectorAll(selector));
    }
    return [selector];
};

module.exports = $;

/***/ }),

/***/ 936:
/***/ ((module) => {

"use strict";


/**
 * fillo
 * Fill additional characters at the beginning of the string.
 *
 * @name fillo
 * @function
 * @param {String|Number} what The input snippet (number, string or anything that can be stringified).
 * @param {Number} size The width of the final string (default: `2`).
 * @param {String} ch The character to repeat (default: `"0"`).
 * @return {String} The input value with filled characters.
 */
module.exports = function fillo(what, size, ch) {
  size = size || 2;
  ch = ch || "0";
  what = what.toString();
  var howMany = size - what.length;
  return (howMany <= 0 ? "" : ch.repeat(howMany)) + what;
};

/***/ }),

/***/ 138:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var months = __webpack_require__(481),
    days = __webpack_require__(137),
    fillo = __webpack_require__(936),
    ParseIt = (__webpack_require__(261).Parser);

var rules = {
    // Years
    /// 2015
    YYYY: function YYYY(i, utc) {
        if (utc) {
            return i.getUTCFullYear();
        }
        return i.getFullYear();
    }

    // 15
    ,
    YY: function YY(i, utc) {
        return rules.YYYY(i, utc) % 100;
    }

    // Months
    // January
    ,
    MMMM: function MMMM(i, utc) {
        if (utc) {
            return months[i.getUTCMonth()];
        }
        return months[i.getMonth()];
    }

    // Jan
    ,
    MMM: function MMM(i, utc) {
        if (utc) {
            return months.abbr[i.getUTCMonth()];
        }
        return months.abbr[i.getMonth()];
    }

    // 01
    ,
    MM: function MM(i, utc) {
        if (utc) {
            return fillo(i.getUTCMonth() + 1);
        }
        return fillo(i.getMonth() + 1);
    }

    // 1
    ,
    M: function M(i, utc) {
        if (utc) {
            return i.getUTCMonth() + 1;
        }
        return i.getMonth() + 1;
    }

    // Days
    // Sunday
    ,
    dddd: function dddd(i, utc) {
        return days[rules.d(i, utc)];
    }

    // Sun
    ,
    ddd: function ddd(i, utc) {
        return days.abbr[rules.d(i, utc)];
    }

    // Su
    ,
    dd: function dd(i, utc) {
        return days.short[rules.d(i, utc)];
    }

    // 0
    ,
    d: function d(i, utc) {
        if (utc) {
            return i.getUTCDay();
        }
        return i.getDay();
    }

    // Dates
    // 06  Day in month
    ,
    DD: function DD(i, utc) {
        return fillo(rules.D(i, utc));
    }

    // 6   Day in month
    ,
    D: function D(i, utc) {
        if (utc) {
            return i.getUTCDate();
        }
        return i.getDate();
    }

    // AM/PM
    // AM/PM
    ,
    A: function A(i, utc) {
        return rules.a(i, utc).toUpperCase();
    }

    // am/pm
    ,
    a: function a(i, utc) {
        return rules.H(i, utc) >= 12 ? "pm" : "am";
    }

    // Hours
    // 08 Hour
    ,
    hh: function hh(i, utc) {
        return fillo(rules.h(i, utc));
    }

    // 8 Hour
    ,
    h: function h(i, utc) {
        return rules.H(i, utc) % 12 || 12;
    }

    // (alias)
    ,
    HH: function HH(i, utc) {
        return fillo(rules.H(i, utc));
    }

    // (alias)
    ,
    H: function H(i, utc) {
        if (utc) {
            return i.getUTCHours();
        }
        return i.getHours();
    }

    // Minutes
    // 09 Minute
    ,
    mm: function mm(i, utc) {
        return fillo(rules.m(i, utc));
    }

    // 9  Minute
    ,
    m: function m(i, utc) {
        if (utc) {
            return i.getUTCMinutes();
        }
        return i.getMinutes();
    }

    // Seconds
    // 09 Seconds
    ,
    ss: function ss(i, utc) {
        return fillo(rules.s(i, utc));
    }

    // 9  Seconds
    ,
    s: function s(i, utc) {
        if (utc) {
            return i.getUTCSeconds();
        }
        return i.getSeconds();
    }

    // Fractional seconds
    // 0 1 ... 8 9
    ,
    S: function S(i, utc) {
        return Math.round(rules.s(i, utc) / 60 * 10);
    },
    SS: function SS(i, utc) {
        return fillo(rules.s(i, utc) / 60 * 100);
    },
    SSS: function SSS(i, utc) {
        return fillo(rules.s(i, utc) / 60 * 1000, 3);
    }

    // Timezones
    ,
    Z: function Z(i) {
        var offset = -i.getTimezoneOffset();
        return (offset >= 0 ? "+" : "-") + fillo(parseInt(offset / 60)) + ":" + fillo(offset % 60);
    },
    ZZ: function ZZ(i) {
        var offset = -i.getTimezoneOffset();
        return (offset >= 0 ? "+" : "-") + fillo(parseInt(offset / 60)) + fillo(offset % 60);
    }
};

var parser = new ParseIt(rules);

/**
 * formatoid
 * Formats the date into a given format.
 *
 * Usable format fields:
 *
 *  - **Years**
 *      - `YYYY` (e.g. `"2015"`)
 *      - `YY` (e.g. `"15"`)
 *  - **Months**
 *      - `MMMM` (e.g. `"January"`)
 *      - `MMM` (e.g. `"Jan"`)
 *      - `MM` (e.g. `"01"`)
 *      - `M` (e.g. `"1"`)
 *  - **Days**
 *      - `dddd` (e.g. `"Sunday"`)
 *      - `ddd` (e.g. `"Sun"`)
 *      - `dd` (e.g. `"Su"`)
 *      - `d` (e.g. `"Su"`)
 *  - **Dates**
 *      - `DD` (e.g. `"07"`)
 *      - `D` (e.g. `"7"`)
 *  - **AM/PM**
 *      - `A` (e.g. `"AM"`)
 *      - `a` (e.g. `"pm"`)
 *  - **Hours**
 *      - `hh` (e.g. `"07"`)–12 hour format
 *      - `h` (e.g. `"7"`)
 *      - `HH` (e.g. `"07"`)–24 hour format
 *      - `H` (e.g. `"7"`)
 *  - **Minutes**
 *      - `mm` (e.g. `"07"`)
 *      - `m` (e.g. `"7"`)
 *  - **Seconds**
 *      - `ss` (e.g. `"07"`)
 *      - `s` (e.g. `"7"`)
 *  - **Fractional seconds**
 *      - `S` (e.g. `0 1 2 3 ... 9`)
 *      - `SS` (e.g. `00 01 02 ... 98 99`)
 *      - `SS` (e.g. `000 001 002 ... 998 999`)
 *  - **Timezones**
 *      - `Z` (e.g. `-07:00 -06:00 ... +06:00 +07:00`)
 *      - `ZZ` (e.g. `-0700 -0600 ... +0600 +0700`)
 *
 * @name formatoid
 * @function
 * @param {Date} i The date object.
 * @param {String} f The date format.
 * @return {String} The formatted date (as string).
 */
module.exports = function formatoid(i, f) {
    return parser.run(f, [i, i._useUTC]);
};

/***/ }),

/***/ 329:
/***/ ((module) => {

"use strict";


module.exports = ["#eee", "#d6e685", "#8cc665", "#44a340", "#1e6823"];

/***/ }),

/***/ 606:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var colorLegend = __webpack_require__(329);

/**
 * parseGitHubCalendarSvg
 * Parses the SVG input (as string).
 *
 * @name parseGitHubCalendarSvg
 * @function
 * @param {String} input The SVG code of the contributions calendar.
 * @return {Object} An object containing:
 *
 *  - `last_year` (Number): The total contributions in the last year.
 *  - `longest_streak` (Number): The longest streak.
 *  - `longest_streak_range` (Array): An array of two date objects representing the date range.
 *  - `current_streak` (Number): The current streak.
 *  - `current_streak_range` (Array): An array of two date objects representing the date range.
 *  - `days` (Array): An array of day objects:
 *       - `fill` (String): The hex color.
 *       - `date` (Date): The day date.
 *       - `count` (Number): The number of commits.
 *       - `level` (Number): A number between 0 and 4 (inclusive) representing the contribution level (more commits, higher value).
 *  - `weeks` (Array): The day objects grouped by weeks (arrays).
 *  - `last_contributed` (Date): The last contribution date.
 */
module.exports = function parseGitHubCalendarSvg(input) {

    var data = {
        last_year: 0,
        longest_streak: -1,
        longest_streak_range: [],
        current_streak: 0,
        current_streak_range: [],
        longest_break: -1,
        longest_break_range: [],
        current_break: 0,
        current_break_range: [],
        weeks: [],
        days: [],
        last_contributed: null
    },
        lastWeek = [],
        updateLongestStreak = function updateLongestStreak() {
        if (data.current_streak > data.longest_streak) {
            data.longest_streak = data.current_streak;
            data.longest_streak_range[0] = data.current_streak_range[0];
            data.longest_streak_range[1] = data.current_streak_range[1];
        }
    },
        updateLongestBreak = function updateLongestBreak() {
        if (data.current_break > data.longest_break) {
            data.longest_break = data.current_break;
            data.longest_break_range[0] = data.current_break_range[0];
            data.longest_break_range[1] = data.current_break_range[1];
        }
    };

    input.split("\n").slice(2).map(function (c) {
        return c.trim();
    }).forEach(function (c) {
        if (c.startsWith("<g transform")) {
            return lastWeek.length && data.weeks.push(lastWeek) && (lastWeek = []);
        }

        var level = c.match(/data-level="([0-9\-]+)"/i),
            date = c.match(/data-date="([0-9\-]+)"/),
            count = c.match(/data-count="([0-9]+)"/);

        level = level && level[1];
        date = date && date[1];
        count = count && +count[1];

        if (!level) {
            return;
        }

        var fill = colorLegend[level];

        var obj = {
            fill: fill,
            date: new Date(date),
            count: count,
            level: level
        };

        if (data.current_streak === 0) {
            data.current_streak_range[0] = obj.date;
        }

        if (data.current_break === 0) {
            data.current_break_range[0] = obj.date;
        }

        if (obj.count) {
            ++data.current_streak;
            data.last_year += obj.count;
            data.last_contributed = obj.date;
            data.current_streak_range[1] = obj.date;

            updateLongestBreak();
            data.current_break = 0;
        } else {
            updateLongestStreak();
            data.current_streak = 0;

            ++data.current_break;
            data.current_break_range[1] = obj.date;
        }

        lastWeek.push(obj);
        data.days.push(obj);
    });

    updateLongestStreak();

    return data;
};

/***/ }),

/***/ 640:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var parse = __webpack_require__(606),
    $ = __webpack_require__(372),
    addSubtractDate = __webpack_require__(861),
    formatoid = __webpack_require__(138);

var DATE_FORMAT1 = "MMM D, YYYY",
    DATE_FORMAT2 = "MMMM D";

var MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function printDayCount(dayCount) {
    return dayCount + " " + (dayCount === 1 ? "day" : "days");
}

function addTooltips(container) {
    var tooltip = document.createElement("div");
    tooltip.classList.add("day-tooltip");
    container.appendChild(tooltip);

    // Add mouse event listener to show & hide tooltip
    var days = container.querySelectorAll(".js-calendar-graph-svg rect.ContributionCalendar-day");
    days.forEach(function (day) {
        day.addEventListener("mouseenter", function (e) {
            var contribCount = e.target.getAttribute("data-count");
            if (contribCount === "0") {
                contribCount = "No contributions";
            } else if (contribCount === "1") {
                contribCount = "1 contribution";
            } else {
                contribCount = contribCount + " contributions";
            }
            var date = new Date(e.target.getAttribute("data-date"));
            var dateText = MONTH_NAMES[date.getUTCMonth()] + " " + date.getUTCDate() + ", " + date.getUTCFullYear();
            tooltip.innerHTML = "<strong>" + contribCount + "</strong> on " + dateText;
            tooltip.classList.add("is-visible");
            var size = e.target.getBoundingClientRect(),
                leftPos = size.left + window.pageXOffset - tooltip.offsetWidth / 2 + size.width / 2,
                topPos = size.bottom + window.pageYOffset - tooltip.offsetHeight - 2 * size.height;
            tooltip.style.top = topPos + "px";
            tooltip.style.left = leftPos + "px";
        });
        day.addEventListener("mouseleave", function () {
            tooltip.classList.remove("is-visible");
        });
    });
}

/**
 * GitHubCalendar
 * Brings the contributions calendar from GitHub (provided username) into your page.
 *
 * @name GitHubCalendar
 * @function
 * @param {String|HTMLElement} container The calendar container (query selector or the element itself).
 * @param {String} username The GitHub username.
 * @param {Object} options An object containing the following fields:
 *
 *    - `summary_text` (String): The text that appears under the calendar (defaults to: `"Summary of
 *      pull requests, issues opened, and commits made by <username>"`).
 *    - `proxy` (Function): A function that receives as argument the username (string) and should return a promise resolving the HTML content of the contributions page.
 *      The default is using @Bloggify's APIs.
 *    - `global_stats` (Boolean): If `false`, the global stats (total, longest and current streaks) will not be calculated and displayed. By default this is enabled.
 *    - `responsive` (Boolean): If `true`, the graph is changed to scale with the container. Custom CSS should be applied to the element to scale it appropriately. By default this is disabled.
 *    - `tooltips` (Boolean): If `true`, tooltips will be shown when hovered over calendar days. By default this is disabled.
 *    - `cache` (Number) The cache time in seconds.
 *
 * @return {Promise} A promise returned by the `fetch()` call.
 */
module.exports = function GitHubCalendar(container, username, options) {

    container = $(container);

    options = options || {};
    options.summary_text = options.summary_text || "Summary of pull requests, issues opened, and commits made by <a href=\"https://github.com/" + username + "\" target=\"blank\">@" + username + "</a>";
    options.cache = (options.cache || 24 * 60 * 60) * 1000;

    if (options.global_stats === false) {
        container.style.minHeight = "175px";
    }

    var cacheKeys = {
        content: "gh_calendar_content." + username,
        expire_at: "gh_calendar_expire." + username

        // We need a proxy for CORS
    };options.proxy = options.proxy || function (username) {
        return fetch("https://api.bloggify.net/gh-calendar/?username=" + username).then(function (r) {
            return r.text();
        });
    };

    options.getCalendar = options.getCalendar || function (username) {
        if (options.cache && Date.now() < +localStorage.getItem(cacheKeys.expire_at)) {
            var content = localStorage.getItem(cacheKeys.content);
            if (content) {
                return Promise.resolve(content);
            }
        }

        return options.proxy(username).then(function (body) {
            if (options.cache) {
                localStorage.setItem(cacheKeys.content, body);
                localStorage.setItem(cacheKeys.expire_at, Date.now() + options.cache);
            }
            return body;
        });
    };

    var fetchCalendar = function fetchCalendar() {
        return options.getCalendar(username).then(function (body) {
            var div = document.createElement("div");
            div.innerHTML = body;
            var cal = div.querySelector(".js-yearly-contributions");
            $(".position-relative h2", cal).remove();
            //cal.querySelector(".float-left.text-gray").innerHTML = options.summary_text

            // Remove 3d visualiser div
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = div.querySelectorAll("a")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var a = _step.value;

                    if (a.textContent.includes("View your contributions in 3D, VR and IRL!")) {
                        a.parentElement.remove();
                    }
                }

                // If 'include-fragment' with spinner img loads instead of the svg, fetchCalendar again
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (cal.querySelector("include-fragment")) {
                setTimeout(fetchCalendar, 500);
            } else {
                // If options includes responsive, SVG element has to be manipulated to be made responsive
                if (options.responsive === true) {
                    var svg = cal.querySelector("svg.js-calendar-graph-svg");
                    // Get the width/height properties and use them to create the viewBox
                    var width = svg.getAttribute("width");
                    var height = svg.getAttribute("height");
                    // Remove height property entirely
                    svg.removeAttribute("height");
                    // Width property should be set to 100% to fill entire container
                    svg.setAttribute("width", "100%");
                    // Add a viewBox property based on the former width/height
                    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
                }

                if (options.global_stats !== false) {
                    var parsed = parse($("svg", cal).outerHTML),
                        currentStreakInfo = parsed.current_streak ? formatoid(parsed.current_streak_range[0], DATE_FORMAT2) + " &ndash; " + formatoid(parsed.current_streak_range[1], DATE_FORMAT2) : parsed.last_contributed ? "Last contributed in " + formatoid(parsed.last_contributed, DATE_FORMAT2) + "." : "Rock - Hard Place",
                        longestStreakInfo = parsed.longest_streak ? formatoid(parsed.longest_streak_range[0], DATE_FORMAT2) + " &ndash; " + formatoid(parsed.longest_streak_range[1], DATE_FORMAT2) : parsed.last_contributed ? "Last contributed in " + formatoid(parsed.last_contributed, DATE_FORMAT2) + "." : "Rock - Hard Place",
                        firstCol = $("<div>", {
                        "class": "contrib-column contrib-column-first table-column",
                        html: "<span class=\"text-muted\">Contributions in the last year</span>\n                               <span class=\"contrib-number\">" + parsed.last_year + " total</span>\n                               <span class=\"text-muted\">" + formatoid(addSubtractDate.add(addSubtractDate.subtract(new Date(), 1, "year"), 1, "day"), DATE_FORMAT1) + " &ndash; " + formatoid(new Date(), DATE_FORMAT1) + "</span>"
                    }),
                        secondCol = $("<div>", {
                        "class": "contrib-column table-column",
                        html: "<span class=\"text-muted\">Longest streak</span>\n                               <span class=\"contrib-number\">" + printDayCount(parsed.longest_streak) + "</span>\n                               <span class=\"text-muted\">" + longestStreakInfo + "</span>"
                    }),
                        thirdCol = $("<div>", {
                        "class": "contrib-column table-column",
                        html: "<span class=\"text-muted\">Current streak</span>\n                               <span class=\"contrib-number\">" + printDayCount(parsed.current_streak) + "</span>\n                               <span class=\"text-muted\">" + currentStreakInfo + "</span>"
                    });

                    cal.appendChild(firstCol);
                    cal.appendChild(secondCol);
                    cal.appendChild(thirdCol);
                }

                container.innerHTML = cal.innerHTML;

                // If options includes tooltips, add tooltips listeners to SVG
                if (options.tooltips === true) {
                    addTooltips(container);
                }
            }
        }).catch(function (e) {
            return console.error(e);
        });
    };

    return fetchCalendar();
};

/***/ }),

/***/ 996:
/***/ ((module) => {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * iterateObject
 * Iterates an object. Note the object field order may differ.
 *
 * @name iterateObject
 * @function
 * @param {Object} obj The input object.
 * @param {Function} fn A function that will be called with the current value, field name and provided object.
 * @return {Function} The `iterateObject` function.
 */
function iterateObject(obj, fn) {
    var i = 0,
        keys = [];

    if (Array.isArray(obj)) {
        for (; i < obj.length; ++i) {
            if (fn(obj[i], i, obj) === false) {
                break;
            }
        }
    } else if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj !== null) {
        keys = Object.keys(obj);
        for (; i < keys.length; ++i) {
            if (fn(obj[keys[i]], keys[i], obj) === false) {
                break;
            }
        }
    }
}

module.exports = iterateObject;

/***/ }),

/***/ 196:
/***/ ((module) => {

"use strict";
/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */



function peg$subclass(child, parent) {
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message  = message;
  this.expected = expected;
  this.found    = found;
  this.location = location;
  this.name     = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return "\"" + literalEscape(expectation.text) + "\"";
        },

        "class": function(expectation) {
          var escapedParts = "",
              i;

          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array
              ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
              : classEscape(expectation.parts[i]);
          }

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },

        any: function(expectation) {
          return "any character";
        },

        end: function(expectation) {
          return "end of input";
        },

        other: function(expectation) {
          return expectation.description;
        }
      };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/"/g,  '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/-/g,  '\\-')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i, j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},

      peg$startRuleFunctions = { start: peg$parsestart },
      peg$startRuleFunction  = peg$parsestart,

      peg$c0 = "#",
      peg$c1 = peg$literalExpectation("#", false),
      peg$c2 = function() { return inPlural[0]; },
      peg$c3 = function() { return { type: 'octothorpe' }; },
      peg$c4 = function(str) { return str.join(''); },
      peg$c5 = "{",
      peg$c6 = peg$literalExpectation("{", false),
      peg$c7 = "}",
      peg$c8 = peg$literalExpectation("}", false),
      peg$c9 = function(arg) {
          return {
            type: 'argument',
            arg: arg
          };
        },
      peg$c10 = ",",
      peg$c11 = peg$literalExpectation(",", false),
      peg$c12 = "select",
      peg$c13 = peg$literalExpectation("select", false),
      peg$c14 = function(arg, m) { if (options.strict) { inPlural.unshift(false); } return m; },
      peg$c15 = function(arg, cases) {
          if (options.strict) inPlural.shift()
          return {
            type: 'select',
            arg: arg,
            cases: cases
          };
        },
      peg$c16 = "plural",
      peg$c17 = peg$literalExpectation("plural", false),
      peg$c18 = "selectordinal",
      peg$c19 = peg$literalExpectation("selectordinal", false),
      peg$c20 = function(arg, m) { inPlural.unshift(true); return m; },
      peg$c21 = function(arg, type, offset, cases) {
          var ls = ((type === 'selectordinal') ? options.ordinal : options.cardinal)
                   || ['zero', 'one', 'two', 'few', 'many', 'other'];
          if (ls && ls.length) cases.forEach(function(c) {
            if (isNaN(c.key) && ls.indexOf(c.key) < 0) throw new Error(
              'Invalid key `' + c.key + '` for argument `' + arg + '`.' +
              ' Valid ' + type + ' keys for this locale are `' + ls.join('`, `') +
              '`, and explicit keys like `=0`.');
          });
          inPlural.shift()
          return {
            type: type,
            arg: arg,
            offset: offset || 0,
            cases: cases
          };
        },
      peg$c22 = function(arg, key, param) {
          return {
            type: 'function',
            arg: arg,
            key: key,
            param: param
          };
        },
      peg$c23 = peg$otherExpectation("identifier"),
      peg$c24 = /^[^\t-\r \x85\u200E\u200F\u2028\u2029!-\/:-@[-\^`{-~\xA1-\xA7\xA9\xAB\xAC\xAE\xB0\xB1\xB6\xBB\xBF\xD7\xF7\u2010-\u2027\u2030-\u203E\u2041-\u2053\u2055-\u205E\u2190-\u245F\u2500-\u2775\u2794-\u2BFF\u2E00-\u2E7F\u3001-\u3003\u3008-\u3020\u3030\uFD3E\uFD3F\uFE45\uFE46]/,
      peg$c25 = peg$classExpectation([["\t", "\r"], " ", "\x85", "\u200E", "\u200F", "\u2028", "\u2029", ["!", "/"], [":", "@"], ["[", "^"], "`", ["{", "~"], ["\xA1", "\xA7"], "\xA9", "\xAB", "\xAC", "\xAE", "\xB0", "\xB1", "\xB6", "\xBB", "\xBF", "\xD7", "\xF7", ["\u2010", "\u2027"], ["\u2030", "\u203E"], ["\u2041", "\u2053"], ["\u2055", "\u205E"], ["\u2190", "\u245F"], ["\u2500", "\u2775"], ["\u2794", "\u2BFF"], ["\u2E00", "\u2E7F"], ["\u3001", "\u3003"], ["\u3008", "\u3020"], "\u3030", "\uFD3E", "\uFD3F", "\uFE45", "\uFE46"], true, false),
      peg$c26 = function(key, tokens) { return { key: key, tokens: tokens }; },
      peg$c27 = function(tokens) { return tokens; },
      peg$c28 = peg$otherExpectation("plural offset"),
      peg$c29 = "offset",
      peg$c30 = peg$literalExpectation("offset", false),
      peg$c31 = ":",
      peg$c32 = peg$literalExpectation(":", false),
      peg$c33 = function(d) { return d; },
      peg$c34 = "=",
      peg$c35 = peg$literalExpectation("=", false),
      peg$c36 = "number",
      peg$c37 = peg$literalExpectation("number", false),
      peg$c38 = "date",
      peg$c39 = peg$literalExpectation("date", false),
      peg$c40 = "time",
      peg$c41 = peg$literalExpectation("time", false),
      peg$c42 = "spellout",
      peg$c43 = peg$literalExpectation("spellout", false),
      peg$c44 = "ordinal",
      peg$c45 = peg$literalExpectation("ordinal", false),
      peg$c46 = "duration",
      peg$c47 = peg$literalExpectation("duration", false),
      peg$c48 = function(key) {
            if (options.strict || /^\d/.test(key)) return false
            switch (key.toLowerCase()) {
              case 'select':
              case 'plural':
              case 'selectordinal':
                return false
              default:
                return true
            }
          },
      peg$c49 = function(key) { return key },
      peg$c50 = function(tokens) { return !options.strict },
      peg$c51 = function(tokens) { return { tokens: tokens } },
      peg$c52 = function(parts) { return { tokens: [parts.join('')] } },
      peg$c53 = peg$otherExpectation("a valid (strict) function parameter"),
      peg$c54 = /^[^'{}]/,
      peg$c55 = peg$classExpectation(["'", "{", "}"], true, false),
      peg$c56 = function(p) { return p.join('') },
      peg$c57 = "'",
      peg$c58 = peg$literalExpectation("'", false),
      peg$c59 = function(quoted) { return quoted },
      peg$c60 = function(p) { return '{' + p.join('') + '}' },
      peg$c61 = peg$otherExpectation("doubled apostrophe"),
      peg$c62 = "''",
      peg$c63 = peg$literalExpectation("''", false),
      peg$c64 = function() { return "'"; },
      peg$c65 = /^[^']/,
      peg$c66 = peg$classExpectation(["'"], true, false),
      peg$c67 = "'{",
      peg$c68 = peg$literalExpectation("'{", false),
      peg$c69 = function(str) { return '\u007B'+str.join(''); },
      peg$c70 = "'}",
      peg$c71 = peg$literalExpectation("'}", false),
      peg$c72 = function(str) { return '\u007D'+str.join(''); },
      peg$c73 = peg$otherExpectation("escaped string"),
      peg$c74 = "'#",
      peg$c75 = peg$literalExpectation("'#", false),
      peg$c76 = function(str) { return "#"+str.join(''); },
      peg$c77 = function(quotedOcto) { return quotedOcto[0]; },
      peg$c78 = peg$otherExpectation("plain char"),
      peg$c79 = /^[^{}#\0-\x08\x0E-\x1F\x7F]/,
      peg$c80 = peg$classExpectation(["{", "}", "#", ["\0", "\b"], ["\x0E", "\x1F"], "\x7F"], true, false),
      peg$c81 = function(octo) { return !inPlural[0]; },
      peg$c82 = function(octo) { return octo; },
      peg$c83 = peg$otherExpectation("integer"),
      peg$c84 = /^[0-9]/,
      peg$c85 = peg$classExpectation([["0", "9"]], false, false),
      peg$c86 = peg$otherExpectation("white space"),
      peg$c87 = /^[\t-\r \x85\u200E\u200F\u2028\u2029]/,
      peg$c88 = peg$classExpectation([["\t", "\r"], " ", "\x85", "\u200E", "\u200F", "\u2028", "\u2029"], false, false),

      peg$currPos          = 0,
      peg$savedPos         = 0,
      peg$posDetailsCache  = [{ line: 1, column: 1 }],
      peg$maxFailPos       = 0,
      peg$maxFailExpected  = [],
      peg$silentFails      = 0,

      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos], p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line:   details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails   = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line:   startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line:   endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parsestart() {
    var s0, s1;

    s0 = [];
    s1 = peg$parsetoken();
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = peg$parsetoken();
    }

    return s0;
  }

  function peg$parsetoken() {
    var s0, s1, s2;

    s0 = peg$parseargument();
    if (s0 === peg$FAILED) {
      s0 = peg$parseselect();
      if (s0 === peg$FAILED) {
        s0 = peg$parseplural();
        if (s0 === peg$FAILED) {
          s0 = peg$parsefunction();
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 35) {
              s1 = peg$c0;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c1); }
            }
            if (s1 !== peg$FAILED) {
              peg$savedPos = peg$currPos;
              s2 = peg$c2();
              if (s2) {
                s2 = void 0;
              } else {
                s2 = peg$FAILED;
              }
              if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c3();
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = [];
              s2 = peg$parsechar();
              if (s2 !== peg$FAILED) {
                while (s2 !== peg$FAILED) {
                  s1.push(s2);
                  s2 = peg$parsechar();
                }
              } else {
                s1 = peg$FAILED;
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c4(s1);
              }
              s0 = s1;
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseargument() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c5;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c6); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseid();
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 125) {
              s5 = peg$c7;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c8); }
            }
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c9(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseselect() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c5;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c6); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseid();
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c10;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c11); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();
              if (s6 !== peg$FAILED) {
                s7 = peg$currPos;
                if (input.substr(peg$currPos, 6) === peg$c12) {
                  s8 = peg$c12;
                  peg$currPos += 6;
                } else {
                  s8 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c13); }
                }
                if (s8 !== peg$FAILED) {
                  peg$savedPos = s7;
                  s8 = peg$c14(s3, s8);
                }
                s7 = s8;
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                      s9 = peg$c10;
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c11); }
                    }
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parse_();
                      if (s10 !== peg$FAILED) {
                        s11 = [];
                        s12 = peg$parseselectCase();
                        if (s12 !== peg$FAILED) {
                          while (s12 !== peg$FAILED) {
                            s11.push(s12);
                            s12 = peg$parseselectCase();
                          }
                        } else {
                          s11 = peg$FAILED;
                        }
                        if (s11 !== peg$FAILED) {
                          s12 = peg$parse_();
                          if (s12 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 125) {
                              s13 = peg$c7;
                              peg$currPos++;
                            } else {
                              s13 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c8); }
                            }
                            if (s13 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c15(s3, s11);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseplural() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c5;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c6); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseid();
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c10;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c11); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();
              if (s6 !== peg$FAILED) {
                s7 = peg$currPos;
                if (input.substr(peg$currPos, 6) === peg$c16) {
                  s8 = peg$c16;
                  peg$currPos += 6;
                } else {
                  s8 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c17); }
                }
                if (s8 === peg$FAILED) {
                  if (input.substr(peg$currPos, 13) === peg$c18) {
                    s8 = peg$c18;
                    peg$currPos += 13;
                  } else {
                    s8 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c19); }
                  }
                }
                if (s8 !== peg$FAILED) {
                  peg$savedPos = s7;
                  s8 = peg$c20(s3, s8);
                }
                s7 = s8;
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                      s9 = peg$c10;
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c11); }
                    }
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parse_();
                      if (s10 !== peg$FAILED) {
                        s11 = peg$parseoffset();
                        if (s11 === peg$FAILED) {
                          s11 = null;
                        }
                        if (s11 !== peg$FAILED) {
                          s12 = [];
                          s13 = peg$parsepluralCase();
                          if (s13 !== peg$FAILED) {
                            while (s13 !== peg$FAILED) {
                              s12.push(s13);
                              s13 = peg$parsepluralCase();
                            }
                          } else {
                            s12 = peg$FAILED;
                          }
                          if (s12 !== peg$FAILED) {
                            s13 = peg$parse_();
                            if (s13 !== peg$FAILED) {
                              if (input.charCodeAt(peg$currPos) === 125) {
                                s14 = peg$c7;
                                peg$currPos++;
                              } else {
                                s14 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c8); }
                              }
                              if (s14 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c21(s3, s7, s11, s12);
                                s0 = s1;
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsefunction() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c5;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c6); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseid();
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c10;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c11); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();
              if (s6 !== peg$FAILED) {
                s7 = peg$parsefunctionKey();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsefunctionParam();
                    if (s9 === peg$FAILED) {
                      s9 = null;
                    }
                    if (s9 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 125) {
                        s10 = peg$c7;
                        peg$currPos++;
                      } else {
                        s10 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c8); }
                      }
                      if (s10 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c22(s3, s7, s9);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseid() {
    var s0, s1, s2;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    if (peg$c24.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c25); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c24.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c25); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c23); }
    }

    return s0;
  }

  function peg$parseselectCase() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseid();
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 !== peg$FAILED) {
          s4 = peg$parsecaseTokens();
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c26(s2, s4);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsepluralCase() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsepluralKey();
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 !== peg$FAILED) {
          s4 = peg$parsecaseTokens();
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c26(s2, s4);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsecaseTokens() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c5;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c6); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = peg$parse_();
      if (s3 !== peg$FAILED) {
        s4 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 123) {
          s5 = peg$c5;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c6); }
        }
        peg$silentFails--;
        if (s5 !== peg$FAILED) {
          peg$currPos = s4;
          s4 = void 0;
        } else {
          s4 = peg$FAILED;
        }
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parsetoken();
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parsetoken();
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 125) {
              s5 = peg$c7;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c8); }
            }
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c27(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseoffset() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 !== peg$FAILED) {
      if (input.substr(peg$currPos, 6) === peg$c29) {
        s2 = peg$c29;
        peg$currPos += 6;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c30); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s4 = peg$c31;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c32); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              s6 = peg$parsedigits();
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c33(s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c28); }
    }

    return s0;
  }

  function peg$parsepluralKey() {
    var s0, s1, s2;

    s0 = peg$parseid();
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61) {
        s1 = peg$c34;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c35); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsedigits();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c33(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parsefunctionKey() {
    var s0, s1, s2, s3, s4, s5;

    if (input.substr(peg$currPos, 6) === peg$c36) {
      s0 = peg$c36;
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c37); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 4) === peg$c38) {
        s0 = peg$c38;
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c39); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 4) === peg$c40) {
          s0 = peg$c40;
          peg$currPos += 4;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c41); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 8) === peg$c42) {
            s0 = peg$c42;
            peg$currPos += 8;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c43); }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c44) {
              s0 = peg$c44;
              peg$currPos += 7;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c45); }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 8) === peg$c46) {
                s0 = peg$c46;
                peg$currPos += 8;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c47); }
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$currPos;
                peg$silentFails++;
                if (input.substr(peg$currPos, 6) === peg$c12) {
                  s2 = peg$c12;
                  peg$currPos += 6;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c13); }
                }
                peg$silentFails--;
                if (s2 === peg$FAILED) {
                  s1 = void 0;
                } else {
                  peg$currPos = s1;
                  s1 = peg$FAILED;
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$currPos;
                  peg$silentFails++;
                  if (input.substr(peg$currPos, 6) === peg$c16) {
                    s3 = peg$c16;
                    peg$currPos += 6;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c17); }
                  }
                  peg$silentFails--;
                  if (s3 === peg$FAILED) {
                    s2 = void 0;
                  } else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                  }
                  if (s2 !== peg$FAILED) {
                    s3 = peg$currPos;
                    peg$silentFails++;
                    if (input.substr(peg$currPos, 13) === peg$c18) {
                      s4 = peg$c18;
                      peg$currPos += 13;
                    } else {
                      s4 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c19); }
                    }
                    peg$silentFails--;
                    if (s4 === peg$FAILED) {
                      s3 = void 0;
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                    if (s3 !== peg$FAILED) {
                      s4 = peg$parseid();
                      if (s4 !== peg$FAILED) {
                        peg$savedPos = peg$currPos;
                        s5 = peg$c48(s4);
                        if (s5) {
                          s5 = void 0;
                        } else {
                          s5 = peg$FAILED;
                        }
                        if (s5 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c49(s4);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsefunctionParam() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 44) {
        s2 = peg$c10;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c11); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parsetoken();
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parsetoken();
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = peg$currPos;
          s4 = peg$c50(s3);
          if (s4) {
            s4 = void 0;
          } else {
            s4 = peg$FAILED;
          }
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c51(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 44) {
          s2 = peg$c10;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c11); }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsestrictFunctionParamPart();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsestrictFunctionParamPart();
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c52(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parsestrictFunctionParamPart() {
    var s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    if (peg$c54.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c55); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c54.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c55); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c56(s1);
    }
    s0 = s1;
    if (s0 === peg$FAILED) {
      s0 = peg$parsedoubleapos();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 39) {
          s1 = peg$c57;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c58); }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseinapos();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 39) {
              s3 = peg$c57;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c58); }
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c59(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c5;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c6); }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parsestrictFunctionParamPart();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parsestrictFunctionParamPart();
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 125) {
                s3 = peg$c7;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c8); }
              }
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c60(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
      }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c53); }
    }

    return s0;
  }

  function peg$parsedoubleapos() {
    var s0, s1;

    peg$silentFails++;
    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c62) {
      s1 = peg$c62;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c63); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c64();
    }
    s0 = s1;
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c61); }
    }

    return s0;
  }

  function peg$parseinapos() {
    var s0, s1, s2;

    s0 = peg$parsedoubleapos();
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = [];
      if (peg$c65.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c66); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c65.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c66); }
          }
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c4(s1);
      }
      s0 = s1;
    }

    return s0;
  }

  function peg$parsequotedCurly() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c67) {
      s1 = peg$c67;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c68); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseinapos();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parseinapos();
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 39) {
          s3 = peg$c57;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c58); }
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c69(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c70) {
        s1 = peg$c70;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c71); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseinapos();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseinapos();
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 39) {
            s3 = peg$c57;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c58); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c72(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parsequoted() {
    var s0, s1, s2, s3, s4, s5;

    peg$silentFails++;
    s0 = peg$parsequotedCurly();
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c74) {
        s3 = peg$c74;
        peg$currPos += 2;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c75); }
      }
      if (s3 !== peg$FAILED) {
        s4 = [];
        s5 = peg$parseinapos();
        while (s5 !== peg$FAILED) {
          s4.push(s5);
          s5 = peg$parseinapos();
        }
        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 39) {
            s5 = peg$c57;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c58); }
          }
          if (s5 !== peg$FAILED) {
            peg$savedPos = s2;
            s3 = peg$c76(s4);
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = peg$currPos;
        s3 = peg$c2();
        if (s3) {
          s3 = void 0;
        } else {
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c77(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 39) {
          s0 = peg$c57;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c58); }
        }
      }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c73); }
    }

    return s0;
  }

  function peg$parseplainChar() {
    var s0, s1;

    peg$silentFails++;
    if (peg$c79.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c80); }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c78); }
    }

    return s0;
  }

  function peg$parsechar() {
    var s0, s1, s2;

    s0 = peg$parsedoubleapos();
    if (s0 === peg$FAILED) {
      s0 = peg$parsequoted();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 35) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c1); }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = peg$currPos;
          s2 = peg$c81(s1);
          if (s2) {
            s2 = void 0;
          } else {
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c82(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parseplainChar();
        }
      }
    }

    return s0;
  }

  function peg$parsedigits() {
    var s0, s1, s2;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    if (peg$c84.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c85); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c84.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c85); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c83); }
    }

    return s0;
  }

  function peg$parse_() {
    var s0, s1, s2;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    if (peg$c87.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c88); }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      if (peg$c87.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c88); }
      }
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c86); }
    }

    return s0;
  }


    var inPlural = [false];


  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse:       peg$parse
};


/***/ }),

/***/ 481:
/***/ ((module) => {

/*!
 * months <https://github.com/datetime/months>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

// English Translation
module.exports = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
module.exports.abbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Italian Translation
module.exports.it = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
module.exports.abbr.it = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

// German Translation
module.exports.de = [ 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
module.exports.abbr.de = [ 'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez' ];


/***/ }),

/***/ 538:
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 261:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var regexEscape = __webpack_require__(179);

var ParseIt = function () {
    /**
     * ParseIt
     * The `ParseIt` class. It can be used to use the same data object but with different formats/arguments.
     *
     * @name ParseIt
     * @function
     * @param {Object} obj An object containing the fields to replace.
     */
    function ParseIt(obj) {
        _classCallCheck(this, ParseIt);

        this.obj = obj || {};
        this.re = new RegExp("^(" + Object.keys(obj).map(regexEscape).join("|") + ")");
    }

    /**
     * run
     * Replaces the fields in the format string with data coming from the data object.
     *
     *
     * @name parseIt
     * @function
     * @param {String} format The format input.
     * @param {Array} args An array of arguments to be passed to the replace function (stored in the `obj` object).
     * @return {String} The result as string.
     */


    _createClass(ParseIt, [{
        key: "run",
        value: function run(format, args) {
            var result = "";
            args = args || [];
            do {
                var arr = format.match(this.re),
                    field = arr && arr[1],
                    c = field || format.charAt(0);

                if (field) {
                    var value = this.obj[field];
                    if (typeof value === "function") {
                        value = value.apply(this, args);
                    }
                    result += value;
                } else {
                    result += c;
                }
                format = format.substring(c.length);
            } while (format);
            return result;
        }
    }]);

    return ParseIt;
}();

/**
 * parseIt
 * A wrapper around the `ParseIt` class. The `ParseIt` constructor is accessible using `parseIt.Parser`.
 *
 * @name parseIt
 * @function
 * @param {String} format The format input.
 * @param {Object} obj An object containing the fields to replace.
 * @param {Array} args An array of arguments to be passed to the replace function (stored in the `obj` object).
 * @return {String} The result as string.
 */


function parseIt(format, obj, args) {
    return new ParseIt(obj).run(format, args);
}

parseIt.Parser = ParseIt;

module.exports = parseIt;

/***/ }),

/***/ 618:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l=__webpack_require__(538),n=60103,p=60106;exports.Fragment=60107;exports.StrictMode=60108;exports.Profiler=60114;var q=60109,r=60110,t=60112;exports.Suspense=60113;var u=60115,v=60116;
if("function"===typeof Symbol&&Symbol.for){var w=Symbol.for;n=w("react.element");p=w("react.portal");exports.Fragment=w("react.fragment");exports.StrictMode=w("react.strict_mode");exports.Profiler=w("react.profiler");q=w("react.provider");r=w("react.context");t=w("react.forward_ref");exports.Suspense=w("react.suspense");u=w("react.memo");v=w("react.lazy")}var x="function"===typeof Symbol&&Symbol.iterator;
function y(a){if(null===a||"object"!==typeof a)return null;a=x&&a[x]||a["@@iterator"];return"function"===typeof a?a:null}function z(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
var A={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},B={};function C(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A}C.prototype.isReactComponent={};C.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(z(85));this.updater.enqueueSetState(this,a,b,"setState")};C.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function D(){}D.prototype=C.prototype;function E(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A}var F=E.prototype=new D;F.constructor=E;l(F,C.prototype);F.isPureReactComponent=!0;var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
function J(a,b,c){var e,d={},k=null,h=null;if(null!=b)for(e in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)H.call(b,e)&&!I.hasOwnProperty(e)&&(d[e]=b[e]);var g=arguments.length-2;if(1===g)d.children=c;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];d.children=f}if(a&&a.defaultProps)for(e in g=a.defaultProps,g)void 0===d[e]&&(d[e]=g[e]);return{$$typeof:n,type:a,key:k,ref:h,props:d,_owner:G.current}}
function K(a,b){return{$$typeof:n,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function L(a){return"object"===typeof a&&null!==a&&a.$$typeof===n}function escape(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}var M=/\/+/g;function N(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
function O(a,b,c,e,d){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case n:case p:h=!0}}if(h)return h=a,d=d(h),a=""===e?"."+N(h,0):e,Array.isArray(d)?(c="",null!=a&&(c=a.replace(M,"$&/")+"/"),O(d,b,c,"",function(a){return a})):null!=d&&(L(d)&&(d=K(d,c+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(M,"$&/")+"/")+a)),b.push(d)),1;h=0;e=""===e?".":e+":";if(Array.isArray(a))for(var g=
0;g<a.length;g++){k=a[g];var f=e+N(k,g);h+=O(k,b,c,f,d)}else if(f=y(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=e+N(k,g++),h+=O(k,b,c,f,d);else if("object"===k)throw b=""+a,Error(z(31,"[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b));return h}function P(a,b,c){if(null==a)return a;var e=[],d=0;O(a,e,"","",function(a){return b.call(c,a,d++)});return e}
function Q(a){if(-1===a._status){var b=a._result;b=b();a._status=0;a._result=b;b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b)},function(b){0===a._status&&(a._status=2,a._result=b)})}if(1===a._status)return a._result;throw a._result;}var R={current:null};function S(){var a=R.current;if(null===a)throw Error(z(321));return a}var T={ReactCurrentDispatcher:R,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:G,IsSomeRendererActing:{current:!1},assign:l};
exports.Children={map:P,forEach:function(a,b,c){P(a,function(){b.apply(this,arguments)},c)},count:function(a){var b=0;P(a,function(){b++});return b},toArray:function(a){return P(a,function(a){return a})||[]},only:function(a){if(!L(a))throw Error(z(143));return a}};exports.Component=C;exports.PureComponent=E;exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T;
exports.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(z(267,a));var e=l({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)H.call(b,f)&&!I.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==g?g[f]:b[f])}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){g=Array(f);for(var m=0;m<f;m++)g[m]=arguments[m+2];e.children=g}return{$$typeof:n,type:a.type,
key:d,ref:k,props:e,_owner:h}};exports.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:r,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:q,_context:a};return a.Consumer=a};exports.createElement=J;exports.createFactory=function(a){var b=J.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};exports.forwardRef=function(a){return{$$typeof:t,render:a}};exports.isValidElement=L;
exports.lazy=function(a){return{$$typeof:v,_payload:{_status:-1,_result:a},_init:Q}};exports.memo=function(a,b){return{$$typeof:u,type:a,compare:void 0===b?null:b}};exports.useCallback=function(a,b){return S().useCallback(a,b)};exports.useContext=function(a,b){return S().useContext(a,b)};exports.useDebugValue=function(){};exports.useEffect=function(a,b){return S().useEffect(a,b)};exports.useImperativeHandle=function(a,b,c){return S().useImperativeHandle(a,b,c)};
exports.useLayoutEffect=function(a,b){return S().useLayoutEffect(a,b)};exports.useMemo=function(a,b){return S().useMemo(a,b)};exports.useReducer=function(a,b,c){return S().useReducer(a,b,c)};exports.useRef=function(a){return S().useRef(a)};exports.useState=function(a){return S().useState(a)};exports.version="17.0.2";


/***/ }),

/***/ 231:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(618);
} else {}


/***/ }),

/***/ 179:
/***/ ((module) => {

"use strict";


/**
 * RegexEscape
 * Escapes a string for using it in a regular expression.
 *
 * @name RegexEscape
 * @function
 * @param {String} input The string that must be escaped.
 * @return {String} The escaped string.
 */
function RegexEscape(input) {
  return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

/**
 * proto
 * Adds the `RegexEscape` function to `RegExp` class.
 *
 * @name proto
 * @function
 * @return {Function} The `RegexEscape` function.
 */
RegexEscape.proto = function () {
  RegExp.escape = RegexEscape;
  return RegexEscape;
};

module.exports = RegexEscape;

/***/ }),

/***/ 474:
/***/ ((module) => {


/**
 * An Array.prototype.slice.call(arguments) alternative
 *
 * @param {Object} args something with a length
 * @param {Number} slice
 * @param {Number} sliceEnd
 * @api public
 */

module.exports = function (args, slice, sliceEnd) {
  var ret = [];
  var len = args.length;

  if (0 === len) return ret;

  var start = slice < 0
    ? Math.max(0, slice + len)
    : slice || 0;

  if (sliceEnd !== undefined) {
    len = sliceEnd < 0
      ? sliceEnd + len
      : sliceEnd
  }

  while (len-- > start) {
    ret[len - start] = args[len];
  }

  return ret;
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ../node_modules/.pnpm/@babel+runtime@7.20.1/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
;// CONCATENATED MODULE: ../node_modules/.pnpm/@babel+runtime@7.20.1/node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
;// CONCATENATED MODULE: ../node_modules/.pnpm/@babel+runtime@7.20.1/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
;// CONCATENATED MODULE: ../node_modules/.pnpm/@babel+runtime@7.20.1/node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
;// CONCATENATED MODULE: ../node_modules/.pnpm/@babel+runtime@7.20.1/node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
;// CONCATENATED MODULE: ../node_modules/.pnpm/@babel+runtime@7.20.1/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
;// CONCATENATED MODULE: ../node_modules/.pnpm/@babel+runtime@7.20.1/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
;// CONCATENATED MODULE: ../node_modules/.pnpm/@babel+runtime@7.20.1/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
;// CONCATENATED MODULE: ../node_modules/.pnpm/@babel+runtime@7.20.1/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
;// CONCATENATED MODULE: ../node_modules/.pnpm/@babel+runtime@7.20.1/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
;// CONCATENATED MODULE: ../node_modules/.pnpm/@babel+runtime@7.20.1/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
;// CONCATENATED MODULE: ../node_modules/.pnpm/@babel+runtime@7.20.1/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
;// CONCATENATED MODULE: ../node_modules/.pnpm/@babel+runtime@7.20.1/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ../node_modules/.pnpm/@babel+runtime@7.20.1/node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
;// CONCATENATED MODULE: ../node_modules/.pnpm/@babel+runtime@7.20.1/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
;// CONCATENATED MODULE: ../node_modules/.pnpm/@babel+runtime@7.20.1/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
;// CONCATENATED MODULE: ../node_modules/.pnpm/@lingui+core@3.14.0/node_modules/@lingui/core/esm/core.production.min.js
var i=function(e){return"string"==typeof e},s=function(e){return"function"==typeof e},u=new Map,c=new Map;function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(r){if(i(r)&&(r=new Date(r)),n){var a=v(e,t),o=c.get(a);if(o)return o.format(r);var l=new Intl.DateTimeFormat(e,t);return c.set(a,l),l.format(r)}var s=new Intl.DateTimeFormat(e,t);return s.format(r)}}function h(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(r){if(n){var a=v(e,t),o=u.get(a);if(o)return o.format(r);var l=new Intl.NumberFormat(e,t);return u.set(a,l),l.format(r)}var i=new Intl.NumberFormat(e,t);return i.format(r)}}function v(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=Array.isArray(e)?e.sort().join("-"):e;return"".concat(n,"-").concat(JSON.stringify(t))}var m=Object.freeze({__proto__:null,date:f,number:h}),g=/\\u[a-fA-F0-9]{4}|\\x[a-fA-F0-9]{2}/g;function _(e){var t=e.locale,n=e.locales,r=e.values,a=e.formats,o=e.localeData,u=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{plurals:void 0},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};t=t||e;var a=n.plurals,o=function(e){return i(e)?r[e]||{style:e}:e},u=function(e,n){return function(r){var a=s(n)?n(r):n,o=Array.isArray(a)?a:[a],l=h(t)(e);return o.map((function(e){return i(e)?e.replace("#",l):e}))}};return a||console.error("Plurals for locale ".concat(e," aren't loaded. Use i18n.loadLocaleData method to load plurals for specific locale. Using other plural rule as a fallback.")),{plural:function(e,t){var n=t.offset,r=void 0===n?0:n,o=_objectWithoutProperties(t,["offset"]),i=o[e]||o[null==a?void 0:a(e-r)]||o.other;return u(e-r,i)},selectordinal:function(e,t){var n=t.offset,r=void 0===n?0:n,o=_objectWithoutProperties(t,["offset"]),i=o[e]||o[null==a?void 0:a(e-r,!0)]||o.other;return u(e-r,i)},select:function(e,t){return t[e]||t.other},number:function(e,n){return h(t,o(n))(e)},date:function(e,n){return f(t,o(n))(e)},undefined:function(e){return e}}}(t,n,o,a);return function e(t,n,a){var o=r[t],l=u[n](o,a),i=s(l)?l(e):l;return Array.isArray(i)?i.join(""):i}}function d(e,t,n,r){return function(a){var l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=_({locale:t,locales:n,localeData:r,formats:l,values:a}),u=function e(t){return Array.isArray(t)?t.reduce((function(t,n){if(i(n))return t+n;var r=_slicedToArray(n,3),a=r[0],l=r[1],u=r[2],c={};null==u||i(u)?c=u:Object.keys(u).forEach((function(t){c[t]=e(u[t])}));var f=s(a,l,c);return null==f?t:t+f}),""):t},c=u(e);return i(c)&&g.test(c)?JSON.parse('"'.concat(c.trim(),'"')):i(c)?c.trim():c}}var p=function(){function n(){_classCallCheck(this,n),this._events={}}return _createClass(n,[{key:"on",value:function(e,t){var n=this;return this._hasEvent(e)||(this._events[e]=[]),this._events[e].push(t),function(){return n.removeListener(e,t)}}},{key:"removeListener",value:function(e,t){if(this._hasEvent(e)){var n=this._events[e].indexOf(t);~n&&this._events[e].splice(n,1)}}},{key:"emit",value:function(e){for(var t=this,n=arguments.length,r=new Array(n>1?n-1:0),a=1;a<n;a++)r[a-1]=arguments[a];this._hasEvent(e)&&this._events[e].map((function(e){return e.apply(t,r)}))}},{key:"_hasEvent",value:function(e){return Array.isArray(this._events[e])}}]),n}();function y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=_getPrototypeOf(e);if(t){var l=_getPrototypeOf(this).constructor;n=Reflect.construct(o,arguments,l)}else n=o.apply(this,arguments);return _possibleConstructorReturn(this,n)}}var b=function(r){_inherits(o,r);var a=y(o);function o(t){var n;return _classCallCheck(this,o),n=a.call(this),n._messages={},n._localeData={},null!=t.missing&&(n._missing=t.missing),null!=t.messages&&n.load(t.messages),null!=t.localeData&&n.loadLocaleData(t.localeData),null==t.locale&&null==t.locales||n.activate(t.locale,t.locales),n}return _createClass(o,[{key:"_loadLocaleData",value:function(e,t){null==this._localeData[e]?this._localeData[e]=t:Object.assign(this._localeData[e],t)}},{key:"loadLocaleData",value:function(e,t){var n=this;null!=t?this._loadLocaleData(e,t):Object.keys(e).forEach((function(t){return n._loadLocaleData(t,e[t])})),this.emit("change")}},{key:"_load",value:function(e,t){null==this._messages[e]?this._messages[e]=t:Object.assign(this._messages[e],t)}},{key:"load",value:function(e,t){var n=this;null!=t?this._load(e,t):Object.keys(e).forEach((function(t){return n._load(t,e[t])})),this.emit("change")}},{key:"activate",value:function(e,t){this._locale=e,this._locales=t,this.emit("change")}},{key:"_",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=n.message,a=n.formats,o=n.context;i(e)||(t=e.values||t,r=e.message,o=e.context,e=e.id);var l,u=!o&&!this.messages[e],c=o&&!this.messages[o][e],f=c||u,h=this._missing;return h&&f?s(h)?h(this._locale,e,o):h:(f&&this.emit("missing",{id:e,context:o,locale:this._locale}),l=o&&!c?this.messages[o][e]||r||e:this.messages[e]||r||e,i(l)&&g.test(l)?JSON.parse('"'.concat(l,'"')):i(l)?l:d(l,this._locale,this._locales,this.localeData)(t,a))}},{key:"date",value:function(e,t){return f(this._locales||this._locale,t)(e)}},{key:"number",value:function(e,t){return h(this._locales||this._locale,t)(e)}},{key:"locale",get:function(){return this._locale}},{key:"locales",get:function(){return this._locales}},{key:"messages",get:function(){var e;return null!==(e=this._messages[this._locale])&&void 0!==e?e:{}}},{key:"localeData",get:function(){var e;return null!==(e=this._localeData[this._locale])&&void 0!==e?e:{}}}]),o}(p);function D(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new b(e)}var k=D();
//# sourceMappingURL=core.production.min.js.map

;// CONCATENATED MODULE: ../node_modules/.pnpm/@babel+runtime@7.20.1/node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
// EXTERNAL MODULE: ../node_modules/.pnpm/messageformat-parser@4.1.3/node_modules/messageformat-parser/parser.js
var parser = __webpack_require__(196);
;// CONCATENATED MODULE: ../node_modules/.pnpm/@lingui+core@3.14.0/node_modules/@lingui/core/esm/core.development.js










var isString = function isString(s) {
  return typeof s === "string";
};
var isFunction = function isFunction(f) {
  return typeof f === "function";
};

/** Memoized cache */

var numberFormats = new Map();
var dateFormats = new Map();
function date(locales) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var memoize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return function (value) {
    if (isString(value)) value = new Date(value);

    if (memoize) {
      var key = cacheKey(locales, format);
      var cachedFormatter = dateFormats.get(key);

      if (cachedFormatter) {
        return cachedFormatter.format(value);
      }

      var _formatter = new Intl.DateTimeFormat(locales, format);

      dateFormats.set(key, _formatter);
      return _formatter.format(value);
    }

    var formatter = new Intl.DateTimeFormat(locales, format);
    return formatter.format(value);
  };
}
function number(locales) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var memoize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return function (value) {
    if (memoize) {
      var key = cacheKey(locales, format);
      var cachedFormatter = numberFormats.get(key);

      if (cachedFormatter) {
        return cachedFormatter.format(value);
      }

      var _formatter2 = new Intl.NumberFormat(locales, format);

      numberFormats.set(key, _formatter2);
      return _formatter2.format(value);
    }

    var formatter = new Intl.NumberFormat(locales, format);
    return formatter.format(value);
  };
}
/** Memoize helpers */

function cacheKey(locales) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var localeKey = Array.isArray(locales) ? locales.sort().join('-') : locales;
  return "".concat(localeKey, "-").concat(JSON.stringify(options));
}

var formats = /*#__PURE__*/Object.freeze({
  __proto__: null,
  date: date,
  number: number
});

var UNICODE_REGEX = /\\u[a-fA-F0-9]{4}|\\x[a-fA-F0-9]{2}/g;

var defaultFormats = function defaultFormats(locale, locales) {
  var localeData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    plurals: undefined
  };
  var formats = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  locales = locales || locale;
  var plurals = localeData.plurals;

  var style = function style(format) {
    return isString(format) ? formats[format] || {
      style: format
    } : format;
  };

  var replaceOctothorpe = function replaceOctothorpe(value, message) {
    return function (ctx) {
      var msg = isFunction(message) ? message(ctx) : message;
      var norm = Array.isArray(msg) ? msg : [msg];

      var valueStr = number(locales)(value);

      return norm.map(function (m) {
        return isString(m) ? m.replace("#", valueStr) : m;
      });
    };
  };

  if (!plurals) {
    console.error("Plurals for locale ".concat(locale, " aren't loaded. Use i18n.loadLocaleData method to load plurals for specific locale. Using other plural rule as a fallback."));
  }

  return {
    plural: function plural(value, _ref) {
      var _ref$offset = _ref.offset,
          offset = _ref$offset === void 0 ? 0 : _ref$offset,
          rules = _objectWithoutProperties(_ref, ["offset"]);

      var message = rules[value] || rules[plurals === null || plurals === void 0 ? void 0 : plurals(value - offset)] || rules.other;
      return replaceOctothorpe(value - offset, message);
    },
    selectordinal: function selectordinal(value, _ref2) {
      var _ref2$offset = _ref2.offset,
          offset = _ref2$offset === void 0 ? 0 : _ref2$offset,
          rules = _objectWithoutProperties(_ref2, ["offset"]);

      var message = rules[value] || rules[plurals === null || plurals === void 0 ? void 0 : plurals(value - offset, true)] || rules.other;
      return replaceOctothorpe(value - offset, message);
    },
    select: function select(value, rules) {
      return rules[value] || rules.other;
    },
    number: function number$1(value, format) {
      return number(locales, style(format))(value);
    },
    date: function date$1(value, format) {
      return date(locales, style(format))(value);
    },
    undefined: function undefined$1(value) {
      return value;
    }
  };
}; // Params -> CTX

/**
 * Creates a context object, which formats ICU MessageFormat arguments based on
 * argument type.
 *
 * @param locale     - Locale of message
 * @param locales      - Locales to be used when formatting the numbers or dates
 * @param values       - Parameters for variable interpolation
 * @param localeData - Locale data (e.g: plurals)
 * @param formats - Custom format styles
 * @returns {function(string, string, any)}
 */


function context(_ref3) {
  var locale = _ref3.locale,
      locales = _ref3.locales,
      values = _ref3.values,
      formats = _ref3.formats,
      localeData = _ref3.localeData;
  var formatters = defaultFormats(locale, locales, localeData, formats);

  var ctx = function ctx(name, type, format) {
    var value = values[name];
    var formatted = formatters[type](value, format);
    var message = isFunction(formatted) ? formatted(ctx) : formatted;
    return Array.isArray(message) ? message.join("") : message;
  };

  return ctx;
}

function interpolate(translation, locale, locales, localeData) {
  return function (values) {
    var formats = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var ctx = context({
      locale: locale,
      locales: locales,
      localeData: localeData,
      formats: formats,
      values: values
    });

    var formatMessage = function formatMessage(message) {
      if (!Array.isArray(message)) return message;
      return message.reduce(function (message, token) {
        if (isString(token)) return message + token;

        var _token = _slicedToArray(token, 3),
            name = _token[0],
            type = _token[1],
            format = _token[2];

        var interpolatedFormat = {};

        if (format != null && !isString(format)) {
          Object.keys(format).forEach(function (key) {
            interpolatedFormat[key] = formatMessage(format[key]);
          });
        } else {
          interpolatedFormat = format;
        }

        var value = ctx(name, type, interpolatedFormat);
        if (value == null) return message;
        return message + value;
      }, "");
    };

    var result = formatMessage(translation);
    if (isString(result) && UNICODE_REGEX.test(result)) return JSON.parse("\"".concat(result.trim(), "\""));
    if (isString(result)) return result.trim();
    return result;
  };
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function processTokens(tokens) {
  if (!tokens.filter(function (token) {
    return !isString(token);
  }).length) {
    return tokens.join("");
  }

  return tokens.map(function (token) {
    if (isString(token)) {
      return token; // # in plural case
    } else if (token.type === "octothorpe") {
      return "#"; // simple argument
    } else if (token.type === "argument") {
      return [token.arg]; // argument with custom format (date, number)
    } else if (token.type === "function") {
      var _param = token.param && token.param.tokens[0];

      var param = typeof _param === "string" ? _param.trim() : _param;
      return [token.arg, token.key, param].filter(Boolean);
    }

    var offset = token.offset ? parseInt(token.offset) : undefined; // complex argument with cases

    var formatProps = {};
    token.cases.forEach(function (item) {
      formatProps[item.key] = processTokens(item.tokens);
    });
    return [token.arg, token.type, _objectSpread({
      offset: offset
    }, formatProps)];
  });
} // Message -> (Params -> String)


function compile(message) {
  try {
    return processTokens((0,parser.parse)(message));
  } catch (e) {
    console.error("Message cannot be parsed due to syntax errors: ".concat(message));
    return message;
  }
}

var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this._events = {};
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(event, listener) {
      var _this = this;

      if (!this._hasEvent(event)) this._events[event] = [];

      this._events[event].push(listener);

      return function () {
        return _this.removeListener(event, listener);
      };
    }
  }, {
    key: "removeListener",
    value: function removeListener(event, listener) {
      if (!this._hasEvent(event)) return;

      var index = this._events[event].indexOf(listener);

      if (~index) this._events[event].splice(index, 1);
    }
  }, {
    key: "emit",
    value: function emit(event) {
      var _this2 = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (!this._hasEvent(event)) return;

      this._events[event].map(function (listener) {
        return listener.apply(_this2, args);
      });
    }
  }, {
    key: "_hasEvent",
    value: function _hasEvent(event) {
      return Array.isArray(this._events[event]);
    }
  }]);

  return EventEmitter;
}();

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var I18n = /*#__PURE__*/function (_EventEmitter) {
  _inherits(I18n, _EventEmitter);

  var _super = _createSuper(I18n);

  function I18n(params) {
    var _this;

    _classCallCheck(this, I18n);

    _this = _super.call(this);
    _this._messages = {};
    _this._localeData = {};
    if (params.missing != null) _this._missing = params.missing;
    if (params.messages != null) _this.load(params.messages);
    if (params.localeData != null) _this.loadLocaleData(params.localeData);

    if (params.locale != null || params.locales != null) {
      _this.activate(params.locale, params.locales);
    }

    return _this;
  }

  _createClass(I18n, [{
    key: "_loadLocaleData",
    value: function _loadLocaleData(locale, localeData) {
      if (this._localeData[locale] == null) {
        this._localeData[locale] = localeData;
      } else {
        Object.assign(this._localeData[locale], localeData);
      }
    }
  }, {
    key: "loadLocaleData",
    value: function loadLocaleData(localeOrAllData, localeData) {
      var _this2 = this;

      if (localeData != null) {
        // loadLocaleData('en', enLocaleData)
        // Loading locale data for a single locale.
        this._loadLocaleData(localeOrAllData, localeData);
      } else {
        // loadLocaleData(allLocaleData)
        // Loading all locale data at once.
        Object.keys(localeOrAllData).forEach(function (locale) {
          return _this2._loadLocaleData(locale, localeOrAllData[locale]);
        });
      }

      this.emit("change");
    }
  }, {
    key: "_load",
    value: function _load(locale, messages) {
      if (this._messages[locale] == null) {
        this._messages[locale] = messages;
      } else {
        Object.assign(this._messages[locale], messages);
      }
    }
  }, {
    key: "load",
    value: function load(localeOrMessages, messages) {
      var _this3 = this;

      if (messages != null) {
        // load('en', catalog)
        // Loading a catalog for a single locale.
        this._load(localeOrMessages, messages);
      } else {
        // load(catalogs)
        // Loading several locales at once.
        Object.keys(localeOrMessages).forEach(function (locale) {
          return _this3._load(locale, localeOrMessages[locale]);
        });
      }

      this.emit("change");
    }
  }, {
    key: "activate",
    value: function activate(locale, locales) {
      {
        if (!this._messages[locale]) {
          console.warn("Messages for locale \"".concat(locale, "\" not loaded."));
        }

        if (!this._localeData[locale]) {
          console.warn("Locale data for locale \"".concat(locale, "\" not loaded. Plurals won't work correctly."));
        }
      }

      this._locale = locale;
      this._locales = locales;
      this.emit("change");
    } // method for translation and formatting

  }, {
    key: "_",
    value: function _(id) {
      var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          message = _ref.message,
          formats = _ref.formats,
          context = _ref.context;

      if (!isString(id)) {
        values = id.values || values;
        message = id.message;
        context = id.context;
        id = id.id;
      }

      var messageMissing = !context && !this.messages[id];
      var contextualMessageMissing = context && !this.messages[context][id];
      var messageUnreachable = contextualMessageMissing || messageMissing; // replace missing messages with custom message for debugging

      var missing = this._missing;

      if (missing && messageUnreachable) {
        return isFunction(missing) ? missing(this._locale, id, context) : missing;
      }

      if (messageUnreachable) {
        this.emit("missing", {
          id: id,
          context: context,
          locale: this._locale
        });
      }

      var translation;

      if (context && !contextualMessageMissing) {
        // context is like a subdirectory of other keys
        translation = this.messages[context][id] || message || id;
      } else {
        translation = this.messages[id] || message || id;
      }

      {
        translation = isString(translation) ? compile(translation) : translation;
      } // hack for parsing unicode values inside a string to get parsed in react native environments


      if (isString(translation) && UNICODE_REGEX.test(translation)) return JSON.parse("\"".concat(translation, "\""));
      if (isString(translation)) return translation;
      return interpolate(translation, this._locale, this._locales, this.localeData)(values, formats);
    }
  }, {
    key: "date",
    value: function date$1(value, format) {
      return date(this._locales || this._locale, format)(value);
    }
  }, {
    key: "number",
    value: function number$1(value, format) {
      return number(this._locales || this._locale, format)(value);
    }
  }, {
    key: "locale",
    get: function get() {
      return this._locale;
    }
  }, {
    key: "locales",
    get: function get() {
      return this._locales;
    }
  }, {
    key: "messages",
    get: function get() {
      var _this$_messages$this$;

      return (_this$_messages$this$ = this._messages[this._locale]) !== null && _this$_messages$this$ !== void 0 ? _this$_messages$this$ : {};
    }
  }, {
    key: "localeData",
    get: function get() {
      var _this$_localeData$thi;

      return (_this$_localeData$thi = this._localeData[this._locale]) !== null && _this$_localeData$thi !== void 0 ? _this$_localeData$thi : {};
    }
  }]);

  return I18n;
}(EventEmitter);

function setupI18n() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new I18n(params);
}

var i18n = setupI18n();


//# sourceMappingURL=core.development.js.map

;// CONCATENATED MODULE: ../node_modules/.pnpm/@lingui+core@3.14.0/node_modules/@lingui/core/esm/index.js




const esm_i18n =  true ? k : 0;
const esm_setupI18n = (/* unused pure expression or super */ null && ( true ? setupI18nProd : 0));
const esm_formats = (/* unused pure expression or super */ null && ( true ? formatsProd : 0));
const esm_I18n = (/* unused pure expression or super */ null && ( true ? I18nProd : 0));
;// CONCATENATED MODULE: ./src/client/prefetch/path2prefetchPath.ts
var path2prefetchPath = function path2prefetchPath(path) {
  // TODO
  if (path !== null && path !== void 0 && path.startsWith("/post")) {
    return "/prefetch".concat(path);
  }
  return undefined;
};
// EXTERNAL MODULE: ../node_modules/.pnpm/react@17.0.2/node_modules/react/index.js
var react = __webpack_require__(231);
;// CONCATENATED MODULE: ./src/client/components/Language/Language.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const Language_module = ({"language":"aYFqAG93sRJ7BJMCPjsa","languageWrapper":"ZAVxrSvsXSeI9pV9Rbax"});
;// CONCATENATED MODULE: ./src/client/components/Language/Language.tsx



// TODO
var languages = new Map();
languages.set("ja", {
  name: "日本語",
  icon: /*#__PURE__*/react.createElement("g-emoji", {
    "fallback-src": "/assets/static/jp.png",
    alias: "Japan"
  }, "\uD83C\uDDEF\uD83C\uDDF5")
});
languages.set("en", {
  name: "English",
  icon: /*#__PURE__*/react.createElement("span", null, /*#__PURE__*/react.createElement("g-emoji", {
    "fallback-src": "/assets/static/us.png",
    alias: "America"
  }, "\uD83C\uDDFA\uD83C\uDDF8"), /*#__PURE__*/react.createElement("g-emoji", {
    "fallback-src": "/assets/static/gb.png",
    alias: "United States"
  }, "\uD83C\uDDEC\uD83C\uDDE7"))
});
var Language = function Language(_ref) {
  var currentLanguage = _ref.currentLanguage,
    currentPath = _ref.currentPath;
  return /*#__PURE__*/react.createElement("details", null, /*#__PURE__*/react.createElement("summary", null, " ", /*#__PURE__*/react.createElement("span", {
    role: "img",
    "aria-label": "language"
  }, /*#__PURE__*/react.createElement("g-emoji", {
    "fallback-src": "/assets/static/earth_africa.png",
    alias: "earth"
  }, "\uD83C\uDF0D")), " ", /*i18n*/esm_i18n._("current_language")), /*#__PURE__*/react.createElement("div", {
    className: Language_module.languageWrapper
  }, Array.from(languages.keys()).map(function (language) {
    return /*#__PURE__*/react.createElement("a", {
      key: language,
      href: "".concat(language === "en" ? "https://en.shinyaigeek.dev" : "http://ja.shinyaigeek.dev").concat(currentPath),
      className: "".concat(Language_module.language, " ").concat(language === currentLanguage ? Language_module.active : "")
    }, /*#__PURE__*/react.createElement("span", {
      role: "img",
      "aria-label": "country"
    }, languages.get(language).icon), languages.get(language).name);
  })));
};
;// CONCATENATED MODULE: ./src/client/components/Header/Header.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const Header_module = ({"header":"J2e3WZniL57BvLtita5T","contents":"hOkVSJvM823tjX0FjgO_","title":"kVHiWHyN1gv5Y41SpACy","icon":"vwQ8HQPKPoICc2atrDju","anchor":"FpNMxf5Gx0pwkDBdeqif","active":"wWEg4CI5VvZ2YHFF0U4s"});
;// CONCATENATED MODULE: ./src/client/components/Header/Header.tsx



function Header(_ref) {
  var language = _ref.language,
    currentPath = _ref.currentPath,
    page = _ref.page;
  return /*#__PURE__*/react.createElement("div", {
    className: Header_module.header
  }, /*#__PURE__*/react.createElement("div", {
    className: Header_module.title
  }, /*#__PURE__*/react.createElement("a", {
    href: "/",
    className: "link2Home"
  }, /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("img", {
    src: "/assets/static/icon_transparent_header.png",
    alt: "icon",
    className: Header_module.icon,
    width: "36px",
    height: "36px"
  }), "shinyaigeek.dev"))), /*#__PURE__*/react.createElement("div", {
    className: Header_module.contents
  }, /*#__PURE__*/react.createElement("div", {
    className: Header_module.anchor
  }, /*#__PURE__*/react.createElement(Language, {
    currentLanguage: language,
    currentPath: currentPath
  })), /*#__PURE__*/react.createElement("div", {
    className: "".concat(Header_module.anchor, " ").concat(page === "home" ? Header_module.active : "")
  }, /*#__PURE__*/react.createElement("a", {
    href: "/",
    className: "link2Home"
  }, "Blog")), /*#__PURE__*/react.createElement("div", {
    className: "".concat(Header_module.anchor, " ").concat(page === "profile" ? Header_module.active : "")
  }, /*#__PURE__*/react.createElement("a", {
    href: "/profile",
    id: "link2profile"
  }, "Profile")), /*#__PURE__*/react.createElement("div", {
    className: "".concat(Header_module.anchor)
  }, /*#__PURE__*/react.createElement("a", {
    href: "https://github-activity.shinyaigeek.dev/",
    id: "link2activity"
  }, "Activity"))));
}
;// CONCATENATED MODULE: ./src/client/components/Footer/Footer.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const Footer_module = ({"footer":"AJQSVdi_FHylcHDbYLWV"});
;// CONCATENATED MODULE: ./src/client/components/Footer/Footer.tsx


function Footer() {
  return /*#__PURE__*/react.createElement("div", {
    className: Footer_module.footer
  }, "Copyright. 2022 Shinyaigeek");
}
;// CONCATENATED MODULE: ./src/client/components/Layout/Layout.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const Layout_module = ({"inner":"sxaQUUuymSmhNwqAMaks","root":"fmapAu0fpx364Dzl_9z0"});
;// CONCATENATED MODULE: ./src/client/components/Layout/Layout.tsx




function Layout(Component) {
  return function (props) {
    return /*#__PURE__*/react.createElement("div", {
      className: Layout_module.root
    }, /*#__PURE__*/react.createElement(Header, {
      language: props.language,
      currentPath: props.currentPath,
      page: props.page
    }), /*#__PURE__*/react.createElement("div", {
      className: Layout_module.inner
    }, /*#__PURE__*/react.createElement(Component, props)), /*#__PURE__*/react.createElement(Footer, null));
  };
}
;// CONCATENATED MODULE: ./src/client/components/DecorationTag/DecorationTag.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const DecorationTag_module = ({"tag":"BYkaTwWlH4C2pP1hi2JY"});
;// CONCATENATED MODULE: ./src/client/components/DecorationTag/DecorationTag.tsx


function DecorationTag(_ref) {
  var tags = _ref.tags;
  return /*#__PURE__*/react.createElement("div", {
    className: DecorationTag_module.tag
  }, tags.map(function (tag, index) {
    return /*#__PURE__*/react.createElement("div", {
      key: "decorationTag__".concat(index)
    }, tag);
  }));
}
;// CONCATENATED MODULE: ./src/client/Post/components/MetaInfo/MetaInfo.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const MetaInfo_module = ({"metaInfo":"Y8c8TlU3k_Y72ndSGmnk"});
;// CONCATENATED MODULE: ./src/client/Post/components/MetaInfo/MetaInfo.tsx
// import { Edit } from "@zeit-ui/react-icons";



function MetaInfo(props) {
  var tags = props.fields.tags;
  return /*#__PURE__*/react.createElement("div", {
    className: MetaInfo_module.metaInfo
  }, /*#__PURE__*/react.createElement("h1", null, props.fields.title), /*#__PURE__*/react.createElement("div", null, props.fields.publishedAt), /*#__PURE__*/react.createElement(DecorationTag, {
    tags: tags
  }));
}
;// CONCATENATED MODULE: ./src/client/Post/components/Anchor/Anchor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const Anchor_module = ({"postAnchor":"h0AHqg9AmVXjXCnYqFqc"});
;// CONCATENATED MODULE: ./src/client/Post/components/Anchor/Anchor.tsx



function Anchor(props) {
  var _props$anchors;
  return /*#__PURE__*/react.createElement("details", {
    className: Anchor_module.postAnchor
  }, /*#__PURE__*/react.createElement("summary", {
    className: "post--anchor__title",
    id: "post--anchor__title"
  }, /*i18n*/esm_i18n._("index")), (_props$anchors = props.anchors) === null || _props$anchors === void 0 ? void 0 : _props$anchors.map(function (anchor, index) {
    return /*#__PURE__*/react.createElement("a", {
      key: index,
      href: "#2__".concat(index)
    }, anchor);
  }));
}
;// CONCATENATED MODULE: ./src/client/Profile/components/BaseProfile/BaseProfile.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const BaseProfile_module = ({"snsIcon":"zdvavtYkqc1dXYPR1y0c","mySnsBox":"v0ZqRqZjlqevKrsWtDTt","mail":"l5KzSvykijElHJc7q2c9","word":"gA7tXpIz5V3YPffc9WIr","hello":"_pakeuUKwDGIGV1PIDFI","name":"zQUgJkaqGKzVRFrvk7mk","jobGlitch":"CMC6WyjhCeKfvY5zyyq0","glitch":"v7yavk2O9dr3NZXn186P","noise-anim":"ezzzRJp5YDoxXrln4bX8","dissolve":"jyJzg6cyWQbLyrAe85b8","noise-anim-2":"t5sQjyNfkobey6NEVf2W"});
;// CONCATENATED MODULE: ./src/client/Profile/components/BaseProfile/BaseProfile.tsx


var BaseProfile = function BaseProfile() {
  return /*#__PURE__*/react.createElement("div", {
    className: "baseprofile"
  }, /*#__PURE__*/react.createElement("div", {
    className: BaseProfile_module.hello
  }, "Hi", " ", /*#__PURE__*/react.createElement("span", {
    role: "img",
    "aria-label": "wave hand"
  }, "\uD83D\uDC4B"), " ", "I'm", " ", /*#__PURE__*/react.createElement("span", {
    className: BaseProfile_module.name
  }, "Shinobu Hayashi a.k.a Shinyaigeek(\u3057\u306B\u3083\u3044)"), "."), /*#__PURE__*/react.createElement("div", {
    className: BaseProfile_module.jobGlitch
  }, /*#__PURE__*/react.createElement("span", {
    "data-text": "Web Developer",
    className: BaseProfile_module.glitch
  }, "Web Developer"), " ", /*#__PURE__*/react.createElement("g-emoji", {
    "fallback-src": "/assets/static/spider_web.png",
    alias: "spider-web"
  }, "\uD83D\uDD78"), " ", "/", " ", /*#__PURE__*/react.createElement("span", {
    "data-text": "Reliable web Enthusiast",
    className: BaseProfile_module.glitch
  }, "Reliable Web Enthusiast"), " ", /*#__PURE__*/react.createElement("g-emoji", {
    "fallback-src": "/assets/static/fire.png",
    alias: "fire"
  }, "\uD83D\uDD25"), " "), /*#__PURE__*/react.createElement("div", {
    className: BaseProfile_module.word
  }, "Faster, Lighter, More accessible, More secure, More productive Web for anyone, anytime , anywhere."), /*#__PURE__*/react.createElement("div", {
    className: BaseProfile_module.mySnsBox
  }, /*#__PURE__*/react.createElement("div", {
    className: BaseProfile_module.snsIcon
  }, /*#__PURE__*/react.createElement("a", {
    id: "twitter",
    href: "https://twitter.com/Shinyaigeek"
  }, /*#__PURE__*/react.createElement("img", {
    src: "/assets/static/twitter.svg",
    alt: "twitter",
    width: "54px",
    height: "54px"
  }))), /*#__PURE__*/react.createElement("div", {
    className: BaseProfile_module.snsIcon
  }, /*#__PURE__*/react.createElement("a", {
    id: "github",
    href: "https://github.com/Shinyaigeek"
  }, /*#__PURE__*/react.createElement("img", {
    src: "/assets/static/github.svg",
    alt: "github",
    width: "54px",
    height: "54px"
  }))), /*#__PURE__*/react.createElement("div", {
    className: BaseProfile_module.snsIcon
  }, /*#__PURE__*/react.createElement("a", {
    id: "linkedin",
    href: "https://www.linkedin.com/in/shinyaigeek/"
  }, /*#__PURE__*/react.createElement("img", {
    src: "/assets/static/linkedin.svg",
    alt: "linkedin",
    width: "54px",
    height: "54px"
  })))), /*#__PURE__*/react.createElement("div", {
    className: BaseProfile_module.mail
  }, /*#__PURE__*/react.createElement("a", {
    href: "mailto:me@shinyaigeek.dev"
  }, "Contact Me on Email", " ", /*#__PURE__*/react.createElement("g-emoji", {
    "fallback-src": "/assets/static/email.png",
    alias: "email"
  }, "\uD83D\uDCE7"))));
};
;// CONCATENATED MODULE: ./src/client/components/Shinyaigeek/Shinyaigeek.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const Shinyaigeek_module = ({"icon":"mdGYkZO2YHxhxRXU338z","earthX":"kEage_DVZV_Stt0z3eAT","dissolve":"qYaEHZBlqqxS2rgxmUWp","earth":"cab8_7jeBIe5dRHd8ikS","earthY":"_5U8hWpqU834VUiKxwCpA","monkey":"O6UishUpXe8xGlTrCl8G","monkeyImg":"J5UgGRYhWe9JWeYlm2bw"});
;// CONCATENATED MODULE: ./src/client/components/Shinyaigeek/Shinyaigeek.tsx


var Shinyaigeek = function Shinyaigeek(props) {
  var css = props.css;
  var additionalStyle = css !== null && css !== void 0 ? css : "";
  return /*#__PURE__*/react.createElement("div", {
    className: "".concat(Shinyaigeek_module.icon, " ").concat(additionalStyle)
  }, /*#__PURE__*/react.createElement("div", {
    className: Shinyaigeek_module.monkey
  }, /*#__PURE__*/react.createElement("img", {
    src: "/assets/static/icon_transparent.png",
    className: Shinyaigeek_module.monkeyImg,
    alt: "monkey-icon",
    width: "270px",
    height: "270px"
  })), /*#__PURE__*/react.createElement("div", {
    className: Shinyaigeek_module.earth
  }, /*#__PURE__*/react.createElement("div", {
    className: Shinyaigeek_module.earthX
  }, /*#__PURE__*/react.createElement("div", {
    className: Shinyaigeek_module.earthY
  }, /*#__PURE__*/react.createElement("img", {
    src: "/assets/static/earth.png",
    alt: "earth",
    width: "50px",
    height: "50px"
  })))));
};
;// CONCATENATED MODULE: ./src/client/Post/Post.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const Post_module = ({"postContent":"L6tHhpo3uw534DnsakEH","profile":"XTxSDCE1gmhoF59UaA7g"});
;// CONCATENATED MODULE: ./src/client/Post/Post.tsx







function Post(props) {
  var content = props.fields.content;
  return /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement(Anchor, {
    anchors: props.anchors
  }), /*#__PURE__*/react.createElement(MetaInfo, props), /*#__PURE__*/react.createElement("div", {
    className: Post_module.postContent,
    dangerouslySetInnerHTML: {
      __html: content
    }
  }), /*#__PURE__*/react.createElement("div", {
    className: Post_module.profile
  }, /*#__PURE__*/react.createElement(Shinyaigeek, null), /*#__PURE__*/react.createElement(BaseProfile, null)));
}
/* harmony default export */ const Post_Post = (Layout(Post));
;// CONCATENATED MODULE: ./src/client/components/Divider/Divider.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const Divider_module = ({"divider":"EKEVceVc7FFDIeCchOiz"});
;// CONCATENATED MODULE: ./src/client/components/Divider/Divider.tsx


function Divider() {
  return /*#__PURE__*/react.createElement("div", {
    className: Divider_module.divider
  });
}
;// CONCATENATED MODULE: ./src/client/Profile/components/Loading/Loading.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const Loading_module = ({"loadingStyle":"PVDy7mRPxzg0jISDdKFp","spin-fade":"EOcvR1xfdLFqOukDP9Bv"});
;// CONCATENATED MODULE: ./src/client/Profile/components/Loading/Loading.tsx


var Loading = function Loading() {
  return /*#__PURE__*/react.createElement("div", {
    className: Loading_module.loadingStyle
  }, Array(30).fill(0).map(function (_) {
    return /*#__PURE__*/react.createElement("div", null);
  }));
};
;// CONCATENATED MODULE: ./src/client/Profile/components/GitHubCalender/GitHubCalendar.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const GitHubCalendar_module = ({"loadingStyle":"_R3xn2yRIj4tIpYxHGZY"});
;// CONCATENATED MODULE: ./src/client/Profile/components/GitHubCalender/GitHubCalender.tsx



var GitHubCalender = function GitHubCalender() {
  return /*#__PURE__*/react.createElement("github-calendar", {
    "user-name": "shinyaigeek",
    cache: 86400
  }, /*#__PURE__*/react.createElement("div", {
    className: GitHubCalendar_module.loadingStyle
  }, /*#__PURE__*/react.createElement(Loading, null)));
};
;// CONCATENATED MODULE: ./src/client/Profile/components/JobItem/JobItem.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const JobItem_module = ({"jobItem":"x7tXNL3pTDGpeCaqbAtd","title":"a2L5go4QCcTqouOUpTAg","position":"gfuOfvRDqpMiKQHf_94E","term":"K9AD_DnCKHVVl4GogcXz","meta":"GyATLBv29nx5X1yGdR4Q"});
;// CONCATENATED MODULE: ./src/client/Profile/components/JobItem/JobItem.tsx


var JobItem = function JobItem(props) {
  return /*#__PURE__*/react.createElement("li", {
    className: JobItem_module.jobItem
  }, /*#__PURE__*/react.createElement("div", {
    className: JobItem_module.title
  }, props.job), /*#__PURE__*/react.createElement("div", {
    className: JobItem_module.meta
  }, /*#__PURE__*/react.createElement("div", {
    className: JobItem_module.position
  }, props.position), "/", /*#__PURE__*/react.createElement("div", {
    className: JobItem_module.term
  }, props.term)), /*#__PURE__*/react.createElement("div", {
    className: "description"
  }, props.description));
};
;// CONCATENATED MODULE: ./src/client/Profile/components/Card/Card.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const Card_module = ({"cardStyle":"UvwzSnlF8frXotMHpn3R","title":"wVQHi6hEwExkt4yHQ06d"});
;// CONCATENATED MODULE: ./src/client/Profile/components/Card/Card.tsx


var Card = function Card(_ref) {
  var title = _ref.title,
    img = _ref.img;
  return /*#__PURE__*/react.createElement("li", {
    className: Card_module.cardStyle
  }, /*#__PURE__*/react.createElement("div", {
    className: Card_module.title
  }, title), /*#__PURE__*/react.createElement("img", {
    src: img,
    alt: title,
    loading: "lazy"
  }));
};
var CardShowcase = function CardShowcase(_ref2) {
  var children = _ref2.children;
  return /*#__PURE__*/react.createElement("ul", null, children);
};
;// CONCATENATED MODULE: ./src/client/Profile/Profile.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const Profile_module = ({"profile":"vYMrLuDdwwho_3s3EJVF","title":"A0to1cYjCeAMvVkOwcnW","lists":"la0ubthyZsl2gSJ7FNW7"});
;// CONCATENATED MODULE: ./src/client/Profile/Profile.tsx










var Profile = Layout(function () {
  return /*#__PURE__*/react.createElement("div", {
    className: Profile_module.profile
  }, /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement(Shinyaigeek, null), /*#__PURE__*/react.createElement(BaseProfile, null), /*#__PURE__*/react.createElement(Divider, null), /*#__PURE__*/react.createElement(GitHubCalender, null), /*#__PURE__*/react.createElement(Divider, null), /*#__PURE__*/react.createElement("div", {
    className: "description"
  }, /*#__PURE__*/react.createElement("div", {
    className: Profile_module.title
  }, "About Me"), /*#__PURE__*/react.createElement("p", {
    className: "content",
    dangerouslySetInnerHTML: {
      __html: /*i18n*/esm_i18n._("aboutme_content")
    }
  })), /*#__PURE__*/react.createElement(Divider, null), /*#__PURE__*/react.createElement("div", {
    className: "history--study element"
  }, /*#__PURE__*/react.createElement("span", {
    className: Profile_module.title
  }, /*i18n*/esm_i18n._("education")), /*#__PURE__*/react.createElement("ul", {
    className: Profile_module.lists
  }, /*#__PURE__*/react.createElement("li", null, "2018: ", /*i18n*/esm_i18n._("graduate_nishiyamato")), /*#__PURE__*/react.createElement("li", null, "2018: ", /*i18n*/esm_i18n._("enroll_univ_tokyo")), /*#__PURE__*/react.createElement("li", null, "2019: ", /*i18n*/esm_i18n._("will_major_in_system")), /*#__PURE__*/react.createElement("li", null, "2020: ", /*i18n*/esm_i18n._("major_in_system")), /*#__PURE__*/react.createElement("li", null, "2022: ", /*i18n*/esm_i18n._("graduate_utokyo")))), /*#__PURE__*/react.createElement(Divider, null), /*#__PURE__*/react.createElement("div", {
    className: "history--job element"
  }, /*#__PURE__*/react.createElement("span", {
    className: Profile_module.title
  }, /*i18n*/esm_i18n._("working_experience")), /*#__PURE__*/react.createElement("ul", null, JobItem({
    job: /*i18n*/esm_i18n._("certain_news_media_company"),
    term: "2019/04 ~",
    description: /*i18n*/esm_i18n._("certain_news_media_company_description"),
    position: /*i18n*/esm_i18n._("certain_news_media_company_position")
  }), JobItem({
    job: /*i18n*/esm_i18n._("recruit"),
    term: "2020/10 ~ 2020/11",
    description: /*i18n*/esm_i18n._("recruit_description"),
    position: /*i18n*/esm_i18n._("recruit_position")
  }), JobItem({
    job: /*i18n*/esm_i18n._("cybozu"),
    term: "2020/09",
    description: /*i18n*/esm_i18n._("cybozu_description"),
    position: /*i18n*/esm_i18n._("cybozu_position")
  }), JobItem({
    job: /*i18n*/esm_i18n._("wantedly"),
    term: "2020/08 ~ 2020/09",
    description: /*i18n*/esm_i18n._("wantedly_description"),
    position: /*i18n*/esm_i18n._("wantedly_position")
  }), JobItem({
    job: /*i18n*/esm_i18n._("voyage_group"),
    term: "2020/08",
    description: /*i18n*/esm_i18n._("voyage_group_description"),
    position: /*i18n*/esm_i18n._("voyage_group_position")
  }), JobItem({
    job: /*i18n*/esm_i18n._("moshimos"),
    term: "2018/10 ~ 2018/12",
    description: /*i18n*/esm_i18n._("moshimos_description"),
    position: /*i18n*/esm_i18n._("moshimos_position")
  }))), /*#__PURE__*/react.createElement(Divider, null), /*#__PURE__*/react.createElement("div", {
    className: "interests"
  }, /*#__PURE__*/react.createElement("div", {
    className: Profile_module.title
  }, "Specialities"), /*#__PURE__*/react.createElement("p", {
    className: "content"
  }, /*#__PURE__*/react.createElement(CardShowcase, null, specialities.map(function (speciality) {
    var _speciality$img;
    return /*#__PURE__*/react.createElement(Card, {
      title: speciality.title,
      img: (_speciality$img = speciality.img) !== null && _speciality$img !== void 0 ? _speciality$img : "/assets/static/placeholder.png"
    });
  }))))));
});
var specialities = [{
  title: "JavaScript",
  img: "/assets/static/javascript.png"
}, {
  title: "TypeScript",
  img: "/assets/static/typescript.png"
}, {
  title: "React",
  img: "/assets/static/react.png"
}, {
  title: "Rust",
  img: "/assets/static/rust.png"
}, {
  title: "Fastly",
  img: "/assets/static/fastly.png"
}, {
  title: "CloudFlare",
  img: "/assets/static/cloudflare.png"
}, {
  title: "Web Performance"
}, {
  title: "Browser"
}, {
  title: "Network"
}, {
  title: "Web Frontend Tooling"
}];
;// CONCATENATED MODULE: ./src/client/Home/components/StartStream/StarStream.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const StarStream_module = ({"startStreamStyle":"eVakckSEWyAecwuanqlF","stars":"BLD80_237DmHwYQbizPJ","rain":"prsQpCRVQ5889I2QXReV","dissolve":"OZvEB463lJQEd_HXQKhc"});
;// CONCATENATED MODULE: ./src/client/Home/components/StartStream/StarStream.tsx


function StarStream() {
  return /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.startStreamStyle
  }, /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }), /*#__PURE__*/react.createElement("div", {
    className: StarStream_module.stars
  }));
}
;// CONCATENATED MODULE: ./src/client/Home/components/WelcomePage/WelcomePage.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const WelcomePage_module = ({"welcome":"fMJrX48kBeXSvRpy8PWd","banana":"tYhxgP6PsemUSkDGLFM_","shinyaigeek":"Utv0fl4cSbwQFLyXEmQU"});
;// CONCATENATED MODULE: ./src/client/Home/components/WelcomePage/WelcomePage.tsx




function WelcomePage() {
  return /*#__PURE__*/react.createElement("div", {
    className: WelcomePage_module.welcome
  }, /*#__PURE__*/react.createElement("img", {
    className: WelcomePage_module.banana,
    src: "/assets/static/banana.png",
    alt: "banana",
    width: "200px",
    height: "200px"
  }), /*#__PURE__*/react.createElement(Shinyaigeek, {
    css: WelcomePage_module.shinyaigeek
  }), /*#__PURE__*/react.createElement(StarStream, null));
}
;// CONCATENATED MODULE: ./src/build/util/getOmmit.ts
var getOmmit = function getOmmit(target) {
  return target.slice(target.search("\n") + 1, target.replace("##", "").search("##")).replace(/\!\[.*\]\(.*\)/g, "");
};
;// CONCATENATED MODULE: ./src/client/Home/components/Item/Item.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const Item_module = ({"itemHomeAnchor":"Pn0q8q_U1JKxIejVpOJh","title":"awNg5zT8e4m8ha4gQc_o","home":"C1Jeu0p0Crg4tZg11p_V","date":"BexeskVlUN7BhiN3WvTW","readMoreAnchor":"nv1fZO1wg4igM6znr0Ax","readMore":"fat_o8R_EFqp_1d8Ms4z","ogp":"Sk3ZJHaL4ixAtuqXNIhf"});
;// CONCATENATED MODULE: ./src/client/Home/components/Item/Item.tsx




var Item = function Item(props) {
  var _props$description;
  return /*#__PURE__*/react.createElement("div", {
    className: Item_module.home
  }, /*#__PURE__*/react.createElement("a", {
    className: Item_module.itemHomeAnchor,
    href: !props.media ? "/post/".concat(props.slug) : props.slug
  }, /*#__PURE__*/react.createElement("div", {
    className: Item_module.title
  }, props.title)), /*#__PURE__*/react.createElement(Divider, null), /*#__PURE__*/react.createElement("div", {
    className: Item_module.date
  }, props.publishedAt), /*#__PURE__*/react.createElement("div", {
    className: Item_module.tags
  }), /*#__PURE__*/react.createElement("div", null, getOmmit((_props$description = props.description) !== null && _props$description !== void 0 ? _props$description : "")), props.ogp && /*#__PURE__*/react.createElement("a", {
    href: !props.media ? "/post/".concat(props.slug) : props.slug,
    tabIndex: -1
  }, /*#__PURE__*/react.createElement("img", {
    src: props.ogp,
    alt: props.title,
    className: Item_module.ogp,
    loading: "lazy",
    width: 1024,
    height: 576
  })), /*#__PURE__*/react.createElement("div", {
    className: Item_module.readMore
  }, /*#__PURE__*/react.createElement("a", {
    className: "item--home__anchor ".concat(Item_module.readMoreAnchor),
    href: !props.media ? "/post/".concat(props.slug) : props.slug,
    tabIndex: -1
  }, "Read")));
};
;// CONCATENATED MODULE: ./src/client/Home/Home.tsx
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || Home_unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function Home_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Home_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Home_arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return Home_arrayLikeToArray(arr); }
function Home_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var Home = function Home(props) {
  var items = [].concat(_toConsumableArray(props.items), _toConsumableArray(props.thirdPirtyItems));
  items.sort(function (l, r) {
    var left = new Date("fields" in l ? l.fields.publishedAt : l.publishedAt);
    var right = new Date("fields" in r ? r.fields.publishedAt : r.publishedAt);
    return left < right ? 1 : -1;
  });
  return /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement(WelcomePage, null), /*#__PURE__*/react.createElement("div", {
    id: "home--items"
  }, items.map(function (item, index) {
    var fields = "fields" in item ? item.fields : item;
    return /*#__PURE__*/react.createElement(Item, _extends({}, fields, {
      key: index
    }));
  })));
};
/* harmony default export */ const Home_Home = (Layout(Home));
// EXTERNAL MODULE: ../node_modules/.pnpm/github-calendar@2.3.1/node_modules/github-calendar/lib/index.js
var lib = __webpack_require__(640);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);
;// CONCATENATED MODULE: ./src/client/registerGitHubCalendar.ts
//@ts-ignore

var registerGitHubCalendar = function registerGitHubCalendar() {
  if (location.pathname === "/profile") {
    lib_default()(".ghCalender", "shinyaigeek", {
      responsive: true,
      cache: 86400
    });
  }
};
;// CONCATENATED MODULE: ./src/client/prefetch/prefetcher.tsx





// TODO: type safe key
var __shinyaigeek_prefetch = {};
var registerPrefetch = function registerPrefetch() {
  var homeAnchors = Array.from(document.getElementsByClassName("link2Home"));
  if (homeAnchors.length > 0) {
    if (!__shinyaigeek_prefetch["home"]) {
      fetch("/prefetch/home").then(function (res) {
        res.json().then(function (json) {
          homeAnchors.forEach(function (homeAnchor) {
            homeAnchor.addEventListener("click", function (evt) {
              evt.preventDefault();
              __shinyaigeek_prefetch["home"] = json;
              evt.preventDefault();
              document.title = "shinyaigeek.dev";
              history.pushState(null, "shinyaigeek.dev", "/");
              /*#__PURE__*/React.createElement(Home_Home, {
                items: json.items,
                prev: json.prev,
                next: json.next
              });
            });
          });
        });
      });
    } else {
      homeAnchors.forEach(function (homeAnchor) {
        homeAnchor.addEventListener("click", function (evt) {
          evt.preventDefault();
          evt.preventDefault();
          document.title = "shinyaigeek.dev";
          history.pushState(null, "shinyaigeek.dev", "/");
          /*#__PURE__*/React.createElement(Home_Home, {
            items: __shinyaigeek_prefetch["home"].items,
            prev: __shinyaigeek_prefetch["home"].prev,
            next: __shinyaigeek_prefetch["home"].next
          });
        });
      });
    }
  }
  var profileAnchor = document.getElementById("link2profile");
  if (profileAnchor) {
    profileAnchor.addEventListener("click", function (evt) {
      evt.preventDefault();
      document.title = "プロフィール | shinyaigeek.dev";
      history.pushState(null, "プロフィール | shinyaigeek.dev", "/profile");
      /*#__PURE__*/React.createElement(Profile, null);
      registerGitHubCalendar();
    });
  }
  // TODO polyfill
  var observer = new IntersectionObserver(function (entries) {
    var _entry$target$getAttr;
    var entry = entries[entries.length - 1];
    if (entry.target.getAttribute("href") === "/profile") {
      return;
    }
    if ((_entry$target$getAttr = entry.target.getAttribute("href")) !== null && _entry$target$getAttr !== void 0 && _entry$target$getAttr.startsWith("#")) {
      return;
    }
    var prefetchPath = path2prefetchPath(entry.target.getAttribute("href"));
    if (prefetchPath) {
      if (!__shinyaigeek_prefetch[prefetchPath]) {
        fetch(prefetchPath).then(function (res) {
          res.json().then(function (json) {
            __shinyaigeek_prefetch[prefetchPath] = json;
            entry.target.addEventListener("click", function (evt) {
              evt.preventDefault();
              var fields = json.fields;
              console.log(json);
              document.title = fields.title;
              history.pushState(null, fields.title, entry.target.getAttribute("href"));
              /*#__PURE__*/React.createElement(Post_Post, {
                fields: fields
              });
            });
          });
        });
      } else {
        entry.target.addEventListener("click", function (evt) {
          evt.preventDefault();
          var fields = __shinyaigeek_prefetch[prefetchPath].fields;
          document.title = fields.title;
          history.pushState(null, fields.title, entry.target.getAttribute("href"));
          /*#__PURE__*/React.createElement(Post_Post, {
            fields: fields
          });
        });
      }
    }
  }, {});
  var linkTags = document.querySelectorAll("a");
  Array.from(linkTags).forEach(function (link) {
    observer.observe(link);
  });
};
;// CONCATENATED MODULE: ./src/client/registerPopupState.tsx






var registerPopupState = function registerPopupState() {
  if (!window.onpopstate) {
    window.onpopstate = function () {
      if (document.location.hash.length > 0) {
        return;
      }
      switch (document.location.pathname) {
        case "/":
          {
            if (__shinyaigeek_prefetch.home) {
              document.title = "shinyaigeek.dev";
              /*#__PURE__*/React.createElement(Home_Home, {
                items: __shinyaigeek_prefetch.home.items,
                prev: __shinyaigeek_prefetch.home.prev,
                next: __shinyaigeek_prefetch.home.next
              });
            } else {
              location.assign("/");
            }
            break;
          }
        case "/profile":
          {
            document.title = "プロフィール | shinyaigeek.dev";
            /*#__PURE__*/React.createElement(Profile, null);
            registerGitHubCalendar();
            break;
          }
        default:
          {
            var pathname = document.location.pathname;
            if (pathname.startsWith("/post")) {
              var prefetchPath = path2prefetchPath(pathname);
              if (prefetchPath) {
                if (__shinyaigeek_prefetch[prefetchPath]) {
                  document.title = __shinyaigeek_prefetch[prefetchPath].title;
                  console.log(__shinyaigeek_prefetch[prefetchPath]);
                  /*#__PURE__*/React.createElement(Post_Post, {
                    fields: __shinyaigeek_prefetch[prefetchPath].fields
                  });
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
// EXTERNAL MODULE: ./src/locales/ja/messages.js
var messages = __webpack_require__(104);
;// CONCATENATED MODULE: ./src/client/main.tsx




// allow js
// @ts-ignore

esm_i18n.load("ja", messages.messages);
esm_i18n.activate("ja");
registerPrefetch();
registerGitHubCalendar();
registerPopupState();
})();

/******/ })()
;