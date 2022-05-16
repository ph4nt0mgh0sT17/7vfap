import {FC} from "react";
import {useParams} from "react-router-dom";

export const EditPost: FC = () => {
    const {postId} = useParams();

    return (
        <h1>{postId}</h1>
    );
}