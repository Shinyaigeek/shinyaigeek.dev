import React, { type FunctionComponent } from 'react';
import styles from './header.module.css';

interface Props {}

export const HeaderComponent: FunctionComponent<Props> = function () {
    return (
        <header className={styles.header}>
            <div className={styles.title}>
                <div>
                    <img
                        src="https://ja.shinyaigeek.dev/assets/static/icon_transparent_header.png"
                        alt="icon"
                        className={styles.icon}
                        width="36px"
                        height="36px"
                    />
                    labs.shinyaigeek.dev
                </div>
            </div>
        </header>
    );
};
