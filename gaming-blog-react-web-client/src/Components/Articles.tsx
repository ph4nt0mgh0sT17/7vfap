import React, {FC, useEffect, useState} from "react";
import {PostResponse} from "../Responses/PostResponse";
import {PostService} from "../services/PostService";
import {LoadingSpinner} from "./LoadingSpinner";
import {Alert, Button} from "react-bootstrap";
import {PostCard} from "./PostCard";

export const Articles: FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [articlePosts, setArticlePosts] = useState<PostResponse[]>([]);

    const _postService = new PostService();

    useEffect(() => {
        _postService.retrieveLatestArticles().then(posts => {
            setArticlePosts(posts.data);
            setIsLoading(false);
        });
    }, [])

    return (
        <React.Fragment>
            <LoadingSpinner title={'Načítám články ...'} isLoading={isLoading}/>

            {articlePosts.length === 0 &&
                <Alert variant={"info"}>
                    Nejsou k dispozici žádné články.
                </Alert>
            }

            {articlePosts.length > 0 &&
                <React.Fragment>
                    <div className="row">
                        <div className="col">
                            <PostCard post={articlePosts[0]} />
                        </div>
                    </div>

                    {articlePosts.slice(1).map((articlePost: PostResponse, index: number) => (
                        <div>
                            {index % 3 === 0 &&
                                <div className="row mb-5 mt-5">
                                    {(index + 1) < articlePosts.length &&
                                        <div className="col-4 p-2">
                                            <PostCard post={articlePosts[index + 1]}/>
                                        </div>
                                    }

                                    {(index + 2) < articlePosts.length &&
                                        <div className="col-4 p-2">
                                            <PostCard post={articlePosts[index + 2]}/>
                                        </div>
                                    }

                                    {(index + 3) < articlePosts.length &&
                                        <div className="col-4 p-2">
                                            <PostCard post={articlePosts[index + 3]}/>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    ))
                    }

                    <div className="row mt-5">
                        <Button variant="primary">
                            Načíst další články
                        </Button>
                    </div>

                </React.Fragment>
            }
        </React.Fragment>

    );
};