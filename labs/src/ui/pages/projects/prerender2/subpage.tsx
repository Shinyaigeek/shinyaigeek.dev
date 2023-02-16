import React, { type FunctionComponent } from 'react';
import { HeadComponent } from '../../../components/head/head';
import { HeaderComponent } from '../../../components/header/header';

import styles from './prerender2.module.css';
import '../../../styles/global.css';

interface Props {}

export const Prerender2SubPageComponent: FunctionComponent<Props> = function () {
    return (
        <html>
            <head>
                <HeadComponent />
            </head>
            <body>
                <HeaderComponent />
                <main className={styles.prerender2}>
                    <div>Prerender2 sub page</div>
                </main>
            </body>
        </html>
    );
};
