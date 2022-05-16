import React, {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {PostResponse} from "../Responses/PostResponse";
import {PostService} from "../services/PostService";
import {LoadingSpinner} from "./LoadingSpinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import {LoginResponse} from "../Models/Responses/LoginResponse";
import {useSelector} from "react-redux";
import {RootState} from "../state/reducers";
import {PostCommentService} from "../services/PostCommentService";
import {PostCommentResponse} from "../Responses/PostCommentResponse";
import {Button} from "@mui/material";
import {PostReactionResponse} from "../Responses/PostReactionResponse";
import {PostReactionService} from "../services/PostReactionService";
import {PostReactionItem} from "../Responses/PostReactionItem";

export const PostDetail: FC = () => {
    const {postId} = useParams();
    const loggedUser: LoginResponse | null = useSelector((state: RootState) => state.application);

    const [post, setPost] = useState<PostResponse | null>(null);
    const [postReactions, setPostReactions] = useState<PostReactionResponse[]>([]);
    const [postComments, setPostComments] = useState<PostCommentResponse[]>([]);

    const [postIsLoading, setPostIsLoading] = useState(true);
    const [reactionsSectionIsLoading, setReactionsSectionIsLoading] = useState(true);
    const [commentSectionIsLoading, setCommentSectionIsLoading] = useState(true);

    const postService = new PostService();
    const postReactionService = new PostReactionService();
    const postCommentService = new PostCommentService();

    useEffect(() => {
        postService.retrievePostById(Number(postId)).then(currentPost => {
            setPost(currentPost.data);
            setPostIsLoading(false);
        });

        postReactionService.retrieveAllPostReactionsForPost(Number(postId)).then(currentReactions => {
            setPostReactions(currentReactions.data);
            setReactionsSectionIsLoading(false);
        })

        postCommentService.retrieveAllCommentsForPost(Number(postId)).then(currentComments => {
            setPostComments(currentComments.data);
            setCommentSectionIsLoading(false);
        });
    }, [])

    const getLikesNumber = (): number => {
        return postReactions.filter(x => x.reaction === PostReactionItem.LIKE).length;
    }

    const getDislikesNumber = (): number => {
        return postReactions.filter(x => x.reaction === PostReactionItem.DISLIKE).length;
    }

    const isLikeActive = (): boolean => {
        if (loggedUser === null)
            return false;

        return postReactions
            .filter(x => x.reaction === PostReactionItem.LIKE)
            .filter(x => x.authorUsername === loggedUser.username).length === 1
    };

    const isDislikeActive = (): boolean => {
        if (loggedUser === null)
            return false;

        return postReactions
            .filter(x => x.reaction === PostReactionItem.DISLIKE)
            .filter(x => x.authorUsername === loggedUser.username).length === 1
    };

    return (
        <React.Fragment>
            <LoadingSpinner title={"Načítá se článek..."} isLoading={postIsLoading}/>
            <div className="article">
                {!postIsLoading && post !== null &&
                    <React.Fragment>
                        <h1>{post.title}</h1>
                        <img className="img-thumbnail mb-5" src={post.thumbnailUrl} alt="Není"/>

                        <div className="container post-content" dangerouslySetInnerHTML={{__html: post.htmlContent}}>
                        </div>
                    </React.Fragment>
                }
                <h2>Reakce:</h2>
                <LoadingSpinner title={'Načítám reakce...'} isLoading={reactionsSectionIsLoading}/>
                {!reactionsSectionIsLoading &&
                    <div className="d-flex flex-row ml-4">
                        <div className={`border border-1 rounded p-2 reaction ${isLikeActive() ? 'like-reaction-active' : ''}`}>
                            <FontAwesomeIcon icon={faThumbsUp} size="2x"/>
                            <span className="ms-2" style={{fontSize: '1.5em'}}>{getLikesNumber()}</span>
                        </div>

                        <div className={`ms-3 border border-1 rounded p-2 reaction ${isDislikeActive() ? 'dislike-reaction-active' : ''}`}>
                            <FontAwesomeIcon icon={faThumbsDown} size="2x"/>
                            <span className="ms-2" style={{fontSize: '1.5em'}}>{getDislikesNumber()}</span>
                        </div>
                    </div>
                }

                <h2>Komentáře</h2>
                <hr/>

                <LoadingSpinner title={'Načítají se komentáře...'} isLoading={commentSectionIsLoading}/>

                {!commentSectionIsLoading &&
                    <div className="container">
                        {loggedUser === null &&
                            <div className="alert alert-primary">
                                Nejste přihlášeni. Nemůžete přidat komentář.
                                <span className="ms-2 login-link">Přihlásit se</span>
                            </div>
                        }

                        {postComments.map((currentPostComment) => (
                            <div className="comment">
                                <h3>{currentPostComment.author.username}</h3>
                                <h5>Unknown date</h5>
                                <hr className="comment-divider"/>
                                <p className="comment-text">{currentPostComment.text}</p>
                                {loggedUser !== null && loggedUser.username === currentPostComment.author.username &&
                                    <Button variant='contained' color='warning'>Smazat</Button>
                                }
                            </div>
                        ))}
                    </div>
                }
            </div>
        </React.Fragment>
    );
};