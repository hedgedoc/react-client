import {Form, FormControl, InputGroup, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {IconButton} from "../../../../icon-button/icon-button";
import {Trans, useTranslation} from "react-i18next";

//(newState: ViewStateEnum) => setViewState(newState)

export type HistoryToolbarChange = (settings: HistoryToolbarState) => void;

export interface HistoryToolbarState {
    viewState: ViewStateEnum
}

export enum ViewStateEnum {
    card,
    table
}

export interface HistoryToolbarProps {
    onSettingsChange: HistoryToolbarChange
}

export const initState: HistoryToolbarState = {
    viewState: ViewStateEnum.card
}

export const HistoryToolbar: React.FC<HistoryToolbarProps> = ({onSettingsChange}) => {

    const [t] = useTranslation()
    const [state, setState] = useState<HistoryToolbarState>(initState);

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
                <IconButton variant={"primary"} icon={"sort"}><Trans i18nKey={"title"}/></IconButton>
            </InputGroup>
            <InputGroup className={"mr-1"}>
                <IconButton variant={"primary"} icon={"sort"}><Trans i18nKey={"time"}/></IconButton>
            </InputGroup>
            <InputGroup className={"mr-1"}>
                <ToggleButtonGroup type="radio" name="options" value={state.viewState}
                                   onChange={(newViewState: ViewStateEnum) => {
                                       setState((prevState) => ({...prevState, viewState: newViewState}))
                                   }}>
                    <ToggleButton value={ViewStateEnum.card}>Card</ToggleButton>
                    <ToggleButton value={ViewStateEnum.table}>Table</ToggleButton>
                </ToggleButtonGroup>
            </InputGroup>
        </Form>
    )
}