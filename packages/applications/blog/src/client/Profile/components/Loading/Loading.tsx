import React from 'react';
import loading from './Loading.module.css';

export const Loading = () => {
    return (
        <div className={loading.loadingStyle}>
            {Array(30)
                .fill(0)
                .map((_) => {
                    return <div />;
                })}
        </div>
    );
};
