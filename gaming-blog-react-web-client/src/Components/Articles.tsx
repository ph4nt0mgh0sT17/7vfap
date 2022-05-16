import React, {FC, useEffect, useState} from "react";
import {PostResponse} from "../Responses/PostResponse";
import {PostService} from "../services/PostService";
import {LoadingSpinner} from "./LoadingSpinner";
import {PostCard} from "./PostCard";
import {Alert, Button} from "@mui/material";

export const Articles: FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [articlePosts, setArticlePosts] = useState<PostResponse[]>([]);

    const _postService = new PostService();

    useEffect(() => {
        _postService.retrieveLatestArticles().then(posts => {
            setArticlePosts(posts.data);
            setIsLoading(false);
        });
    }, []);

    const deletePostFromList = (postId: number) => {
        let newPostsList = articlePosts.filter(x => x.id !== postId);
        setArticlePosts(newPostsList);
    };

    return (
        <React.Fragment>
            <LoadingSpinner title={'Načítám články ...'} isLoading={isLoading}/>

            {articlePosts.length === 0 &&
                <Alert severity={"info"}>
                    Nejsou k dispozici žádné články.
                </Alert>
            }

            {articlePosts.length > 0 &&
                <React.Fragment>
                    <div className="row">
                        <div className="col">
                            <PostCard post={articlePosts[0]} onDeletePost={deletePostFromList}/>
                        </div>
                    </div>

                    {articlePosts.slice(1).map((articlePost: PostResponse, index: number) => (
                        <div>
                            {index % 3 === 0 &&
                                <div className="row mb-5 mt-5">
                                    {(index + 1) < articlePosts.length &&
                                        <div className="col-4 p-2">
                                            <PostCard post={articlePosts[index + 1]} onDeletePost={deletePostFromList}/>
                                        </div>
                                    }

                                    {(index + 2) < articlePosts.length &&
                                        <div className="col-4 p-2">
                                            <PostCard post={articlePosts[index + 2]} onDeletePost={deletePostFromList}/>
                                        </div>
                                    }

                                    {(index + 3) < articlePosts.length &&
                                        <div className="col-4 p-2">
                                            <PostCard post={articlePosts[index + 3]} onDeletePost={deletePostFromList}/>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    ))
                    }

                    <div className="row mt-5">
                        <Button variant="contained">
                            Načíst další články
                        </Button>
                    </div>

                </React.Fragment>
            }
        </React.Fragment>

    );
};