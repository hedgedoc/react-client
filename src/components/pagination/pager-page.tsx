import React, {Fragment} from "react";

export interface PagerPageProps {
    pageIndex: number
    numberOfElementsPerPage: number
}

export const PagerPage: React.FC<PagerPageProps> = ({children, numberOfElementsPerPage, pageIndex}) => {
    return <Fragment>
        {
            React.Children.toArray(children).filter((value, index) => {
                const pageOfElement = Math.floor(index / numberOfElementsPerPage);
                return (pageOfElement === pageIndex);
            })
        }
    </Fragment>
}