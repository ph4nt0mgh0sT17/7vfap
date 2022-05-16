import {PostResponse} from "../Responses/PostResponse";
import React, {FC} from "react";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {PostService} from "../services/PostService";
import {LoginResponse} from "../Models/Responses/LoginResponse";
import {useSelector} from "react-redux";
import {RootState} from "../state/reducers";
import Swal from "sweetalert2";

export interface PostCardProps {
    post: PostResponse;
    onDeletePost: (postId: number) => void;
}

export const PostCard: FC<PostCardProps> = (props) => {
    const {post, onDeletePost} = props;

    const postService = new PostService();

    const loggedUser: LoginResponse | null = useSelector((state: RootState) => state.application);

    const deletePost = async (postId: number) => {
        try {
            await postService.deletePost(postId);
            await Swal.fire({
                titleText: 'Tento příspěvek byl úspěšně smazán.',
                icon: 'success',
                confirmButtonText: 'Zavřít'
            });

            onDeletePost(postId);
        } catch (err: any) {
            if (err.response) {
                if (err.response.status === 400 || err.response.status === 404) {
                    await Swal.fire({
                        titleText: 'Tento příspěvek nemohl být smazán. Příspěvek zřejmě už neexistuje.',
                        icon: 'error',
                        confirmButtonText: 'Zavřít'
                    });
                }
            }
        }
    };

    return (
        <div className="card w-100">
            <img srcSet={post.thumbnailUrl}
                 className="card-img-top" alt=""/>
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>

                {post.description != null &&
                    <p className="card-text">
                        {post.description}
                    </p>
                }
                <Link to={"/posts/" + post.id}>
                    <Button variant="contained">
                        Zobrazit
                    </Button>
                </Link>

                {loggedUser !== null &&
                    <Link className="ms-3" to={"/edit-post/" + post.id}>
                        <Button variant="contained" color="success">
                            Upravit příspěvek
                        </Button>
                    </Link>
                }

                {loggedUser !== null &&
                    <Button className="ms-3" variant="contained" color="error"
                            onClick={() => deletePost(post.id)}>
                        Smazat příspěvek
                    </Button>
                }

            </div>
        </div>
    );
}