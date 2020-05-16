import React from 'react'
import {Badge, Card} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import "../common/button.scss"
import {PinButton} from "../common/pin-button";
import {CloseButton} from "../common/close-button";
import moment from "moment";
import {useTranslation} from "react-i18next";
import {HistoryContentChildrenProps} from "../history-content/history-content";

export const HistoryCard: React.FC<HistoryContentChildrenProps> = ({entry, onPinClick}) => {
    useTranslation()
    return (
        <div className="p-2 col-xs-12 col-sm-6 col-md-6 col-lg-4">
            <Card className="p-0" text={"dark"} bg={"light"}>
                <div className="d-flex justify-content-between p-2">
                    <PinButton pin={entry.pinned} onPinClick={() => {
                        onPinClick(entry.id)
                    }}/>
                    <Card.Title className="m-0 mt-3">{entry.title}</Card.Title>
                    <CloseButton/>
                </div>
                <Card.Body>
                    <div className="text-black-50">
                        <FontAwesomeIcon icon="clock"/> {moment(entry.lastVisited).fromNow()}<br/>
                        {moment(entry.lastVisited).format("llll")}
                        <div children={
                            entry.tags.map((tag) => <Badge variant={"dark"} key={tag}>{tag}</Badge>)
                        }
                        />
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
