import React, {FC} from "react";
import {Button} from "@mui/material";
import {PostCommentRequest} from "../Models/Requests/PostCommentRequest";
import {PostCommentResponse} from "../Responses/PostCommentResponse";
import moment from "moment";

export interface PostCommentSectionProps {
    isUserLoggedIn: boolean;
    loggedUsername: string | undefined;
    postComments: PostCommentResponse[];
    onCommentDelete: (postCommentId: number) => void;
}

export const PostCommentSection: FC<PostCommentSectionProps> = (props) => {
    const {isUserLoggedIn, loggedUsername, postComments, onCommentDelete} = props;

    const getCommentDateText = (postComment: PostCommentResponse) => {
        let momentLocale = moment.locale('cs');
        return `${moment(postComment.creationDateTime).format('DD. MMMM yyyy')} ve ${moment(postComment.creationDateTime).format('HH:mm')}`;
    }

    return (
        <div className="container">
            {!isUserLoggedIn &&
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
                    {isUserLoggedIn && loggedUsername === currentPostComment.author.username &&
                        <Button variant='contained' color='warning'
                                onClick={() => onCommentDelete(currentPostComment.id)}>Smazat</Button>
                    }
                </div>
            ))}
        </div>
    );
}