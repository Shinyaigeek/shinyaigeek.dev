import React from 'react';
import shinyaigeek from './Shinyaigeek.module.css';

interface Props {
    css?: string;
}

export const Shinyaigeek = (props: Props) => {
    const { css } = props;
    const additionalStyle = css ?? '';
    return (
        <div className={`${shinyaigeek.icon} ${additionalStyle}`}>
            <div className={shinyaigeek.monkey}>
                <img
                    src={'/assets/static/icon_transparent.png'}
                    className={shinyaigeek.monkeyImg}
                    alt="monkey-icon"
                    width="270px"
                    height="270px"
                />
            </div>
            <div className={shinyaigeek.earth}>
                <div className={shinyaigeek.earthX}>
                    <div className={shinyaigeek.earthY}>
                        <img
                            src={'/assets/static/earth.png'}
                            alt="earth"
                            width="50px"
                            height="50px"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
