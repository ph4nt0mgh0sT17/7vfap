import React, {FC, useEffect, useState} from "react";
import {PostResponse} from "../Responses/PostResponse";
import {PostService} from "../services/PostService";
import {LoadingSpinner} from "./LoadingSpinner";
import {PostCard} from "./PostCard";
import {Alert, Button} from "@mui/material";

export const FirstFeelings: FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [firstFeelingsPosts, setFirstFeelingsPosts] = useState<PostResponse[]>([]);

    const _postService = new PostService();

    useEffect(() => {
        _postService.retrieveLatestFirstFeelings().then(posts => {
            setFirstFeelingsPosts(posts.data);
            setIsLoading(false);
        });
    }, [])

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
                            <PostCard post={firstFeelingsPosts[0]} />
                        </div>
                    </div>

                    {firstFeelingsPosts.slice(1).map((firstFeelingPost: PostResponse, index: number) => (
                        <div>
                            {index % 3 === 0 &&
                                <div className="row mb-5 mt-5">
                                    {(index + 1) < firstFeelingsPosts.length &&
                                        <div className="col-4 p-2">
                                            <PostCard post={firstFeelingsPosts[index + 1]}/>
                                        </div>
                                    }

                                    {(index + 2) < firstFeelingsPosts.length &&
                                        <div className="col-4 p-2">
                                            <PostCard post={firstFeelingsPosts[index + 2]}/>
                                        </div>
                                    }

                                    {(index + 3) < firstFeelingsPosts.length &&
                                        <div className="col-4 p-2">
                                            <PostCard post={firstFeelingsPosts[index + 3]}/>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    ))
                    }

                    <div className="row mt-5">
                        <Button variant="contained">
                            Načíst další první dojmy
                        </Button>
                    </div>

                </React.Fragment>
            }
        </React.Fragment>

    );
};