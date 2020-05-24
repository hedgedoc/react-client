import React, {Fragment, useEffect, useState} from "react";
import {Pagination} from "react-bootstrap";
import {PageItem} from "./page-item/page-item";

export interface PaginationProps {
    numberOfPageButtonsToShowAfterAndBeforeCurrent: number
    onPageChange: (pageIndex: number) => void
    lastPageIndex: number
}

export const PagerPagination: React.FC<PaginationProps> = ({numberOfPageButtonsToShowAfterAndBeforeCurrent, onPageChange, lastPageIndex}) => {

    console.log(lastPageIndex);
    useEffect(() => {
        if (numberOfPageButtonsToShowAfterAndBeforeCurrent % 2 !== 0) {
            throw new Error("number of pages to show must be even!")
        }
    }, [numberOfPageButtonsToShowAfterAndBeforeCurrent])

    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        onPageChange(pageIndex)
    })

    const wantedLowerPageIndex = pageIndex - numberOfPageButtonsToShowAfterAndBeforeCurrent;
    const wantedUpperPageIndex = pageIndex + numberOfPageButtonsToShowAfterAndBeforeCurrent;

    const correctedLowerPageIndex =
        Math.min(
            Math.max(
                Math.min(
                    wantedLowerPageIndex,
                    wantedLowerPageIndex + lastPageIndex - wantedUpperPageIndex
                ),
                0
            ),
            lastPageIndex
        );

    const correctedUpperPageIndex =
        Math.max(0,
            Math.min(
                Math.max(
                    wantedUpperPageIndex,
                    wantedUpperPageIndex - wantedLowerPageIndex
                ),
                lastPageIndex
            )
        );

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