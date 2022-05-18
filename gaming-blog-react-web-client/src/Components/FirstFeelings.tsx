import React, {FC, useEffect, useState} from "react";
import {PostResponse} from "../Responses/PostResponse";
import {PostService} from "../services/PostService";
import {LoadingSpinner} from "./LoadingSpinner";
import {PostCard} from "./PostCard";
import {Alert, Button} from "@mui/material";

export const FirstFeelings: FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [firstFeelingsPosts, setFirstFeelingsPosts] = useState<PostResponse[]>([]);
    const [firstFeelingsCount, setFirstFeelingsCount] = useState(0);

    const _postService = new PostService();

    useEffect(() => {
        _postService.retrieveLatestFirstFeelings().then(posts => {
            setFirstFeelingsPosts(posts.data);
            setFirstFeelingsCount(posts.data.length);
            setIsLoading(false);
        });
    }, [])

    const deletePostFromList = (postId: number) => {
        let newPostsList = firstFeelingsPosts.filter(x => x.id !== postId);
        setFirstFeelingsPosts(newPostsList);
        setFirstFeelingsCount(newPostsList.length);
    }

    const onAnotherFirstFeelingsRefresh = async () => {
        const anotherPosts = (await _postService.retrieveAnotherLatestFirstFeelings(firstFeelingsCount)).data;
        const newPosts = firstFeelingsPosts.concat(anotherPosts);
        setFirstFeelingsPosts(newPosts);
        setFirstFeelingsCount(newPosts.length);
    }

    return (
        <React.Fragment>
            <LoadingSpinner title={'Načítám první dojmy ...'} isLoading={isLoading}/>

            {firstFeelingsPosts.length === 0 &&
                <Alert severity={"info"}>
                    Nejsou k dispozici žádné první dojmy.
                </Alert>
            }

            {firstFeelingsPosts.length > 0 &&
                <React.Fragment>
                    <div className="row">
                        <div className="col">
                            <PostCard post={firstFeelingsPosts[0]} onDeletePost={deletePostFromList} />
                        </div>
                    </div>

                    {firstFeelingsPosts.slice(1).map((firstFeelingPost: PostResponse, index: number) => (
                        <div>
                            {index % 3 === 0 &&
                                <div className="row mb-5 mt-5">
                                    {(index + 1) < firstFeelingsPosts.length &&
                                        <div className="col-4 p-2">
                                            <PostCard post={firstFeelingsPosts[index + 1]} onDeletePost={deletePostFromList}/>
                                        </div>
                                    }

                                    {(index + 2) < firstFeelingsPosts.length &&
                                        <div className="col-4 p-2">
                                            <PostCard post={firstFeelingsPosts[index + 2]} onDeletePost={deletePostFromList}/>
                                        </div>
                                    }

                                    {(index + 3) < firstFeelingsPosts.length &&
                                        <div className="col-4 p-2">
                                            <PostCard post={firstFeelingsPosts[index + 3]} onDeletePost={deletePostFromList}/>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    ))
                    }

                    <div className="row mt-5">
                        <Button variant="contained" onClick={onAnotherFirstFeelingsRefresh}>
                            Načíst další první dojmy
                        </Button>
                    </div>

                </React.Fragment>
            }
        </React.Fragment>

    );
};