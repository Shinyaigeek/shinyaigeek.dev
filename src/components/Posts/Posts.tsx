import { Component } from "solid-js";
import { Meta } from "../../utils/makeIndex/makeIndex";
import { HomeProps } from "../../pages/Home";
import { Post } from "../Post/Post";

export const Posts:Component<HomeProps> = (props) => {
    return (
        <div className="posts">
            {/* {props.items.map((item) => {
                return <Post {...item} />
            })} */}

            {
                props.items.map(item => {
                    return <div>{item.name}</div>
                })
            }
        </div>
    )
}