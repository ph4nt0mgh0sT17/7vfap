import {PostReactionItem} from "./PostReactionItem";

export interface PostReactionResponse {
    reaction: PostReactionItem;
    authorUsername: string;
}