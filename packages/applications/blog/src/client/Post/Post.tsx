import parse from 'html-react-parser';

import { Layout } from '../components/Layout/Layout';
import { Entry } from '../../build/util/getBlogPost';
import { MetaInfo } from './components/MetaInfo/MetaInfo';
import { Anchor } from './components/Anchor/Anchor';
import { BaseProfile } from '../Profile/components/BaseProfile/BaseProfile';
import { Shinyaigeek } from '../components/Shinyaigeek/Shinyaigeek';
import React from 'react';
import postContent from './Post.module.css';
interface Props extends Entry {
    anchors: string[];
}

function Post(props: Props) {
    const { content } = props.fields;
    return (
        <div>
            <Anchor anchors={props.anchors} />
            <MetaInfo {...props} />
            <div
                className={postContent.postContent}
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            />

            <div className={postContent.profile}>
                <Shinyaigeek />
                <BaseProfile />
            </div>
        </div>
    );
}

export default Layout(Post);
