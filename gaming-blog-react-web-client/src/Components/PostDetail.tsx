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
import {Alert, Button, Snackbar, TextField} from "@mui/material";
import {PostReactionResponse} from "../Responses/PostReactionResponse";
import {PostReactionService} from "../services/PostReactionService";
import {PostReactionItem} from "../Responses/PostReactionItem";
import Swal from "sweetalert2";
import {ValidationError} from "./Dialogs/LoginDialog";
import {PostCommentRequest} from "../Models/Requests/PostCommentRequest";

import moment from "moment";
import 'moment/locale/cs';

export const PostDetail: FC = () => {
    const {postId} = useParams();
    const loggedUser: LoginResponse | null = useSelector((state: RootState) => state.application);

    const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

    const [commentText, setCommentText] = useState('');

    const [snackbarOpen, setSnackbarOpen] = useState(false);

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

    const handleUpdatePostReaction = async (postReactionItem: PostReactionItem) => {
        if (loggedUser === null) {
            setSnackbarOpen(true);
            return;
        }

        const isPostReactionActive = postReactions
            .filter(x => x.reaction === postReactionItem)
            .filter(x => x.authorUsername === loggedUser.username).length === 1;

        if (isPostReactionActive) {
            try {
                await postReactionService.deletePostReaction(Number(postId));
                let newPostReactions = postReactions.slice();
                setPostReactions(newPostReactions.filter(x => x.authorUsername !== loggedUser.username));
            } catch (err: any) {
                if (err.response) {
                    if (err.response.status < 500 || err.response.status >= 400) {
                        await Swal.fire({
                            titleText: 'Reakce nemohla být odstraněna.',
                            icon: 'error',
                            confirmButtonText: 'Zavřít'
                        });
                    }
                }
            }
        } else {
            try {
                await postReactionService.savePostReaction(
                    {
                        postReactionItem: postReactionItem
                    },
                    Number(postId)
                );

                let newPostReactions = postReactions.slice();
                newPostReactions = newPostReactions.filter(x => x.authorUsername !== loggedUser.username);
                newPostReactions.push({
                    reaction: postReactionItem,
                    authorUsername: loggedUser.username
                });
                setPostReactions(newPostReactions);
            } catch (err: any) {
                if (err.response) {
                    if (err.response.status < 500 || err.response.status >= 400) {
                        await Swal.fire({
                            titleText: 'Reakce nemohla být uložena.',
                            icon: 'error',
                            confirmButtonText: 'Zavřít'
                        });
                    }
                }
            }
        }


    }


    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    const validateCommentText = (validationErrors: ValidationError[]) => {
        if (commentText === '') {
            validationErrors.push({
                name: 'commentText',
                errorText: 'Komentář nemůže být prázdný.'
            });
        }
    }

    const onCommentAdd = async () => {
        let currentValidationErrors: ValidationError[] = [];

        validateCommentText(currentValidationErrors);

        setValidationErrors(currentValidationErrors);

        if (currentValidationErrors.length > 0) {
            return;
        }

        const postCommentRequest: PostCommentRequest = {
            text: commentText
        };

        try {
            await postCommentService.saveComment(postCommentRequest, Number(postId));
            await Swal.fire({
                title: 'Komentář je úspěšně přidán.',
                icon: 'success'
            });

            setCommentText('');

            setCommentSectionIsLoading(true);
            setPostComments((await postCommentService.retrieveAllCommentsForPost(Number(postId))).data);
            setCommentSectionIsLoading(false);


        } catch (err) {
            await Swal.fire({
                title: 'Komentář nemůže být přidán.',
                icon: 'error'
            });
        }
    }

    const onCommentDelete = async (postCommentId: number) => {
        try {
            await postCommentService.deleteComment(postCommentId);

            await Swal.fire({
                title: 'Komentář je úspěšně smazán.',
                icon: 'success'
            });

            setPostComments(postComments.filter(x => x.id !== postCommentId));
        } catch (err) {
            await Swal.fire({
                title: 'Komentář nemůže být smazán.',
                icon: 'error'
            });
        }
    }

    const getCommentDateText = (postComment: PostCommentResponse) => {
        let momentLocale = moment.locale('cs');
        return `${moment(postComment.creationDateTime).format('DD. MMMM yyyy')} ve ${moment(postComment.creationDateTime).format('HH:mm')}`;
    }

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
                        <div onClick={() => handleUpdatePostReaction(PostReactionItem.LIKE)}
                             className={`border border-1 rounded p-2 reaction ${isLikeActive() ? 'like-reaction-active' : ''}`}>
                            <FontAwesomeIcon icon={faThumbsUp} size="2x"/>
                            <span className="ms-2" style={{fontSize: '1.5em'}}>{getLikesNumber()}</span>
                        </div>

                        <div onClick={() => handleUpdatePostReaction(PostReactionItem.DISLIKE)}
                             className={`ms-3 border border-1 rounded p-2 reaction ${isDislikeActive() ? 'dislike-reaction-active' : ''}`}>
                            <FontAwesomeIcon icon={faThumbsDown} size="2x"/>
                            <span className="ms-2" style={{fontSize: '1.5em'}}>{getDislikesNumber()}</span>
                        </div>
                    </div>
                }

                <h2>Komentáře</h2>
                <hr/>

                {loggedUser !== null &&
                    <div className="container">
                        <div className="row mb-3">
                            <TextField required id="outlined-required"
                                       value={commentText}
                                       onChange={(event) => setCommentText(event.target.value)}
                                       error={validationErrors.find(x => x.name === 'commentText') !== undefined}
                                       helperText={validationErrors.find(x => x.name === 'commentText') !== undefined ? validationErrors.find(x => x.name === 'commentText')?.errorText : ''}
                                       label="Komentář"
                                       multiline
                                       rows={6}
                                       variant="outlined"/>
                        </div>

                        <Button variant="contained" onClick={onCommentAdd}>
                            Přidat komentář
                        </Button>
                    </div>
                }

                <LoadingSpinner title={'Načítají se komentáře...'} isLoading={commentSectionIsLoading}/>

                {!commentSectionIsLoading &&
                    <div className="container">
                        {loggedUser === null &&
                            <div className="alert alert-primary">
                                Nejste přihlášeni. Nemůžete přidat komentář.
                            </div>
                        }

                        {postComments.map((currentPostComment) => (
                            <div className="comment">
                                <h3>{currentPostComment.author.username}</h3>
                                <h5>{getCommentDateText(currentPostComment)}</h5>
                                <hr className="comment-divider"/>
                                <p className="comment-text">{currentPostComment.text}</p>
                                {loggedUser !== null && loggedUser.username === currentPostComment.author.username &&
                                    <Button variant='contained' color='warning' onClick={() => onCommentDelete(currentPostComment.id)}>Smazat</Button>
                                }
                            </div>
                        ))}
                    </div>
                }

                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity="error" sx={{width: '100%'}}>
                        Nemůžete reagovat na příspěvek pokud nejste přihlášení.
                    </Alert>
                </Snackbar>
            </div>
        </React.Fragment>
    );
};