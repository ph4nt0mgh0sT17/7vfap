import {PostResponse} from "../Responses/PostResponse";
import React, {FC} from "react";

export interface PostCardProps {
    post: PostResponse;
}

export const PostCard: FC<PostCardProps> = (props) => {
    return <div className="card w-100">
        <img srcSet={props.post.thumbnailUrl}
             className="card-img-top" alt=""/>
        <div className="card-body">
            <h5 className="card-title">{props.post.title}</h5>

            {props.post.description != null &&
                <p className="card-text">
                    {props.post.description}
                </p>
            }

            <a href={"/posts/" + props.post.id}
               className="btn btn-primary">Zobrazit
                recenzi</a>
        </div>
    </div>;
}