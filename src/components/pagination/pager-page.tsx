import React, {Fragment, useEffect} from "react";

export interface PagerPageProps {
    pageIndex: number
    numberOfElementsPerPage: number
    onLastPageIndexChange: (lastPageIndex: number) => void
}

export const PagerPage: React.FC<PagerPageProps> = ({children, numberOfElementsPerPage, pageIndex, onLastPageIndexChange}) => {

    useEffect(() => {
        const lastPageIndex = Math.ceil(React.Children.count(children) / numberOfElementsPerPage) - 1;
        console.log(lastPageIndex);
        onLastPageIndexChange(lastPageIndex)
    }, [children, onLastPageIndexChange])

    return <Fragment>
        {
            React.Children.toArray(children).filter((value, index) => {
                const pageOfElement = Math.floor((index) / numberOfElementsPerPage);
                return (pageOfElement === pageIndex);
            })
        }
    </Fragment>
}