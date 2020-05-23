import React, {Fragment, useEffect, useState} from "react";
import {Pagination} from "react-bootstrap";
import {PageItem} from "./page-item/page-item";

export interface PaginationProps {
    numberOfPagesToShow: number
    numberOfElementsPerPage: number
    onPageChange: (pageIndex: number) => void
}

export const PagerPagination: React.FC<PaginationProps> = ({children, numberOfPagesToShow, numberOfElementsPerPage, onPageChange}) => {

    useEffect(() => {
        if (numberOfPagesToShow % 2 !== 0) {
            throw new Error("number of pages to show must be even!")
        }
    }, [numberOfPagesToShow])

    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        onPageChange(pageIndex)
    })

    const lastPageIndex = React.Children.count(children) / numberOfElementsPerPage - 1;

    const wantedLowerPageIndex = pageIndex - numberOfPagesToShow;
    const wantedUpperPageIndex = pageIndex + numberOfPagesToShow;

    const correctedLowerPageIndex = Math.max(Math.min(wantedLowerPageIndex, wantedLowerPageIndex + lastPageIndex - wantedUpperPageIndex), 0);
    const correctedUpperPageIndex = Math.min(Math.max(wantedUpperPageIndex, wantedUpperPageIndex - wantedLowerPageIndex), lastPageIndex);

    const paginationItemsBefore = Array.from(new Array(pageIndex - correctedLowerPageIndex)).map((k, index) => {
        const itemIndex = correctedLowerPageIndex + index;
        return <PageItem key={itemIndex} index={itemIndex} onClick={setPageIndex}/>
    });

    const paginationItemsAfter = Array.from(new Array(correctedUpperPageIndex - pageIndex)).map((k, index) => {
        const itemIndex = pageIndex + index + 1;
        return <PageItem key={itemIndex} index={itemIndex} onClick={setPageIndex}/>
    });

    return (
        <Pagination>
            {
                correctedLowerPageIndex > 0 ?
                    <Fragment>
                        <PageItem key={0} index={0} onClick={setPageIndex}/>
                        <Pagination.Ellipsis disabled/>
                    </Fragment>
                    : null
            }
            {paginationItemsBefore}
            <Pagination.Item active>{pageIndex + 1}</Pagination.Item>
            {paginationItemsAfter}
            {
                correctedUpperPageIndex < lastPageIndex ?
                    <Fragment>
                        <Pagination.Ellipsis disabled/>
                        <PageItem key={lastPageIndex} index={lastPageIndex} onClick={setPageIndex}/>
                    </Fragment>
                    : null
            }
        </Pagination>
    );
}