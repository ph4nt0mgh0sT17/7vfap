import React, {FC, useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {PostService} from "../services/PostService";
import {LoadingSpinner} from "./LoadingSpinner";
import {PostResponse} from "../Responses/PostResponse";
import {Alert, Button} from "react-bootstrap";
import {PostCard} from "./PostCard";

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

    return (
        <React.Fragment>
            <LoadingSpinner title={'Načítám recenze ...'} isLoading={isLoading}/>

            {reviewPosts.length === 0 &&
                <Alert variant={"info"}>
                    Nejsou k dispozici žádné recenze.
                </Alert>
            }

            {reviewPosts.length > 0 &&
                <React.Fragment>
                    <div className="row">
                        <div className="col">
                            <PostCard post={reviewPosts[0]} />
                        </div>
                    </div>

                    {reviewPosts.slice(1).map((reviewPost: PostResponse, index: number) => (
                        <div>
                            {index % 3 === 0 &&
                                <div className="row mb-5 mt-5">
                                    {(index + 1) < reviewPosts.length &&
                                        <div className="col-4 p-2">
                                            <PostCard post={reviewPosts[index + 1]}/>
                                        </div>
                                    }

                                    {(index + 2) < reviewPosts.length &&
                                        <div className="col-4 p-2">
                                            <PostCard post={reviewPosts[index + 2]}/>
                                        </div>
                                    }

                                    {(index + 3) < reviewPosts.length &&
                                        <div className="col-4 p-2">
                                            <PostCard post={reviewPosts[index + 3]}/>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    ))
                    }

                    <div className="row mt-5">
                        <Button variant="primary">
                            Načíst další recenze
                        </Button>
                    </div>

                </React.Fragment>
            }
        </React.Fragment>

    );
};