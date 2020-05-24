import React, {Fragment, useState} from "react";
import {Row, Table} from "react-bootstrap"
import {HistoryTableRow} from "./history-table-row";
import {HistoryEntriesProps} from "../history-content/history-content";
import {Trans} from "react-i18next";
import {PagerPage} from "../../../../pagination/pager-page";
import {PagerPagination} from "../../../../pagination/pager-pagination";

export const HistoryTable: React.FC<HistoryEntriesProps> = ({entries, onPinClick}) => {

    const [pageIndex, setPageIndex] = useState(0);
    const [lastPageIndex, setLastPageIndex] = useState(0);

    return (
        <Fragment>
            <Table striped bordered hover size="sm" variant="dark">
                <thead>
                <tr>
                    <th><Trans i18nKey={"title"}/></th>
                    <th><Trans i18nKey={"lastVisit"}/></th>
                    <th><Trans i18nKey={"tags"}/></th>
                <th><Trans i18nKey={"actions"}/></th>
                </tr>
                </thead>
                <tbody>
                <PagerPage numberOfElementsPerPage={6} pageIndex={pageIndex} onLastPageIndexChange={setLastPageIndex}>
                    {
                        entries.map((entry) =>
                            <HistoryTableRow
                                key={entry.id}
                                entry={entry}
                                onPinClick={onPinClick}
                            />)
                    }
                </PagerPage>
                </tbody>
            </Table>
            <Row className="justify-content-center">
                <PagerPagination numberOfPageButtonsToShowAfterAndBeforeCurrent={2} lastPageIndex={lastPageIndex}
                                 onPageChange={setPageIndex}/>
            </Row>
        </Fragment>
    )
}
