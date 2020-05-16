import {Button, Form, FormControl, InputGroup, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Trans, useTranslation} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SortButton, SortModeEnum} from "../../../../sort-button/sort-button";

export type HistoryToolbarChange = (settings: HistoryToolbarState) => void;

export interface HistoryToolbarState {
    viewState: ViewStateEnum
    titleSortDirection: SortModeEnum
    lastVisitedSortDirection: SortModeEnum
}

export enum ViewStateEnum {
    card,
    table
}

export interface HistoryToolbarProps {
    onSettingsChange: HistoryToolbarChange
}

export const initState: HistoryToolbarState = {
    viewState: ViewStateEnum.card,
    titleSortDirection: SortModeEnum.no,
    lastVisitedSortDirection: SortModeEnum.no
}

export const HistoryToolbar: React.FC<HistoryToolbarProps> = ({onSettingsChange}) => {

    const [t] = useTranslation()
    const [state, setState] = useState<HistoryToolbarState>(initState);

    const titleSortChanged = (direction: SortModeEnum) => {
        setState(prevState => ({
            ...prevState,
            titleSortDirection: direction,
            lastVisitedSortDirection: SortModeEnum.no
        }))
    }

    const lastVisitedSortChanged = (direction: SortModeEnum) => {
        setState(prevState => ({
            ...prevState,
            lastVisitedSortDirection: direction,
            titleSortDirection: SortModeEnum.no
        }))
    }

    useEffect(() => {
        onSettingsChange(state);
    }, [onSettingsChange, state])

    return (
        <Form inline={true}>
            <InputGroup className={"mr-1"}>
                <FormControl
                    placeholder={t("chooseTags")}
                    aria-label={t("chooseTags")}
                />
            </InputGroup>
            <InputGroup className={"mr-1"}>
                <FormControl
                    placeholder={t("searchKeywords")}
                    aria-label={t("searchKeywords")}
                />
            </InputGroup>
            <InputGroup className={"mr-1"}>
                <SortButton onChange={titleSortChanged} direction={state.titleSortDirection} variant={"light"}><Trans
                    i18nKey={"title"}/></SortButton>
            </InputGroup>
            <InputGroup className={"mr-1"}>
                <SortButton onChange={lastVisitedSortChanged} direction={state.lastVisitedSortDirection}
                            variant={"light"}><Trans i18nKey={"lastVisited"}/></SortButton>
            </InputGroup>
            <InputGroup className={"mr-1"}>
                <Button variant={"light"}>
                    <FontAwesomeIcon icon={"download"}/>
                </Button>
            </InputGroup>
            <InputGroup className={"mr-1"}>
                <Button variant={"light"}>
                    <FontAwesomeIcon icon={"upload"}/>
                </Button>
            </InputGroup>
            <InputGroup className={"mr-1"}>
                <Button variant={"light"}>
                    <FontAwesomeIcon icon={"trash"}/>
                </Button>
            </InputGroup>
            <InputGroup className={"mr-1"}>
                <Button variant={"light"}>
                    <FontAwesomeIcon icon={"sync"}/>
                </Button>
            </InputGroup>
            <InputGroup className={"mr-1"}>
                <ToggleButtonGroup type="radio" name="options" value={state.viewState}
                                   onChange={(newViewState: ViewStateEnum) => {
                                       setState((prevState) => ({...prevState, viewState: newViewState}))
                                   }}>
                    <ToggleButton className={"btn-light"} value={ViewStateEnum.card}>Card</ToggleButton>
                    <ToggleButton className={"btn-light"} value={ViewStateEnum.table}>Table</ToggleButton>
                </ToggleButtonGroup>
            </InputGroup>
        </Form>
    )
}