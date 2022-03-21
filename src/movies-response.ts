import {SearchEntity} from "./search-response";

export interface MoviesResponse {
    Search?: (SearchEntity)[] | null;
    totalResults: string;
    Response: string;
}
