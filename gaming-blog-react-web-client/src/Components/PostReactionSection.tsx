import React, {FC} from "react";
import {PostReactionItem} from "../Responses/PostReactionItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {PostReactionResponse} from "../Responses/PostReactionResponse";

export interface PostReactionSectionProps {
    postReactions: PostReactionResponse[];
    isUserLoggedIn: boolean;
    loggedUsername: string | undefined;
    handleUpdatePostReaction: (postReactionItem: PostReactionItem) => void;
}

export const PostReactionSection: FC<PostReactionSectionProps> = (props) => {
    const {postReactions, isUserLoggedIn, loggedUsername, handleUpdatePostReaction} = props;

    const isLikeActive = (): boolean => {
        if (!isUserLoggedIn)
            return false;

        return postReactions
            .filter(x => x.reaction === PostReactionItem.LIKE)
            .filter(x => x.authorUsername === loggedUsername).length === 1
    };

    const isDislikeActive = (): boolean => {
        if (!isUserLoggedIn)
            return false;

        return postReactions
            .filter(x => x.reaction === PostReactionItem.DISLIKE)
            .filter(x => x.authorUsername === loggedUsername).length === 1
    };

    const getLikesNumber = (): number => {
        return postReactions.filter(x => x.reaction === PostReactionItem.LIKE).length;
    }

    const getDislikesNumber = (): number => {
        return postReactions.filter(x => x.reaction === PostReactionItem.DISLIKE).length;
    }

    return (
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
    )
}