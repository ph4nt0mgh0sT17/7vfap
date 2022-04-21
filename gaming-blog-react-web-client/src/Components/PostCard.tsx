import {PostResponse} from "../Responses/PostResponse";
import React, {FC} from "react";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

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
            <Link to={"/posts/" + props.post.id}>
                <Button variant="contained">
                    Zobrazit
                </Button>
            </Link>

        </div>
    </div>;
}