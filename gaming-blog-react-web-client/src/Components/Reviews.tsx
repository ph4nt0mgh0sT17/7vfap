import React, {FC, useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {PostService} from "../services/PostService";
import {LoadingSpinner} from "./LoadingSpinner";
import {PostResponse} from "../Responses/PostResponse";
import {PostCard} from "./PostCard";
import {Alert, Button} from "@mui/material";

export const Reviews: FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [reviewPosts, setReviewPosts] = useState<PostResponse[]>([]);

    const _postService = new PostService();

    useEffect(() => {
        _postService.retrieveLatestReviews().then(posts => {
            setReviewPosts(posts.data);
            setIsLoading(false);
        });
    }, [])

    const deletePostFromList = (postId: number) => {
        let newPostsList = reviewPosts.filter(x => x.id !== postId);
        setReviewPosts(newPostsList);
    }

    return (
        <React.Fragment>
            <LoadingSpinner title={'Načítám recenze ...'} isLoading={isLoading}/>

            {reviewPosts.length === 0 &&
                <Alert severity={"info"}>
                    Nejsou k dispozici žádné recenze.
                </Alert>
            }

            {reviewPosts.length > 0 &&
                <React.Fragment>
                    <div className="row">
                        <div className="col">
                            <PostCard post={reviewPosts[0]} onDeletePost={deletePostFromList} />
                        </div>
                    </div>

                    {reviewPosts.slice(1).map((reviewPost: PostResponse, index: number) => (
                        <div>
                            {index % 3 === 0 &&
                                <div className="row mb-5 mt-5">
                                    {(index + 1) < reviewPosts.length &&
                                        <div className="col-4 p-2">
                                            <PostCard post={reviewPosts[index + 1]} onDeletePost={deletePostFromList}/>
                                        </div>
                                    }

                                    {(index + 2) < reviewPosts.length &&
                                        <div className="col-4 p-2">
                                            <PostCard post={reviewPosts[index + 2]} onDeletePost={deletePostFromList}/>
                                        </div>
                                    }

                                    {(index + 3) < reviewPosts.length &&
                                        <div className="col-4 p-2">
                                            <PostCard post={reviewPosts[index + 3]} onDeletePost={deletePostFromList}/>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    ))
                    }

                    <div className="row mt-5">
                        <Button variant="contained">
                            Načíst další recenze
                        </Button>
                    </div>

                </React.Fragment>
            }
        </React.Fragment>

    );
};