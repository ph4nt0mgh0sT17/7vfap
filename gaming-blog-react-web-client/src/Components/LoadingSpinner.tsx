import React, {FC} from "react";

export interface LoadingSpinnerProps {
    title: string;
    isLoading: boolean;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = (props) => {
    if (props.isLoading) {
        return (
            <React.Fragment>
                <h3>{props.title}</h3>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </React.Fragment>
        );
    } else {
        return null;
    }
};