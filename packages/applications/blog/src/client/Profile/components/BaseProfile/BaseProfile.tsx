import React from 'react';
import baseProfile from './BaseProfile.module.css';

export const BaseProfile = () => {
    return (
        <div className="baseprofile">
            <div className={baseProfile.hello}>
                Hi{' '}
                <span
                    role="img"
                    aria-label="wave hand"
                >
                    👋
                </span>{' '}
                I'm{' '}
                <span className={baseProfile.name}>
                    Shinobu Hayashi a.k.a Shinyaigeek(しにゃい)
                </span>
                .
            </div>
            <div className={baseProfile.jobGlitch}>
                <span
                    data-text="Web Developer"
                    className={baseProfile.glitch}
                >
                    Web Developer
                </span>{' '}
                <g-emoji
                    fallback-src="/assets/static/spider_web.png"
                    alias="spider-web"
                >
                    🕸
                </g-emoji>{' '}
                /{' '}
                <span
                    data-text="Reliable web Enthusiast"
                    className={baseProfile.glitch}
                >
                    Reliable Web Enthusiast
                </span>{' '}
                <g-emoji
                    fallback-src="/assets/static/fire.png"
                    alias="fire"
                >
                    🔥
                </g-emoji>{' '}
            </div>
            <div className={baseProfile.word}>
                Faster, Lighter, More accessible, More secure, More productive Web for anyone,
                anytime , anywhere.
            </div>
            <div className={baseProfile.mySnsBox}>
                <div className={baseProfile.snsIcon}>
                    <a
                        id="twitter"
                        href="https://twitter.com/Shinyaigeek"
                    >
                        <img
                            src={'/assets/static/twitter.svg'}
                            alt="twitter"
                            width="54px"
                            height="54px"
                        />
                    </a>
                </div>
                <div className={baseProfile.snsIcon}>
                    <a
                        id="github"
                        href="https://github.com/Shinyaigeek"
                    >
                        <img
                            src={'/assets/static/github.svg'}
                            alt="github"
                            width="54px"
                            height="54px"
                        />
                    </a>
                </div>
                <div className={baseProfile.snsIcon}>
                    <a
                        id="linkedin"
                        href="https://www.linkedin.com/in/shinyaigeek/"
                    >
                        <img
                            src={'/assets/static/linkedin.svg'}
                            alt="linkedin"
                            width="54px"
                            height="54px"
                        />
                    </a>
                </div>
            </div>
            <div className={baseProfile.mail}>
                <a href="mailto:me@shinyaigeek.dev">
                    Contact Me on Email{' '}
                    <g-emoji
                        fallback-src="/assets/static/email.png"
                        alias="email"
                    >
                        📧
                    </g-emoji>
                </a>
            </div>
        </div>
    );
};
