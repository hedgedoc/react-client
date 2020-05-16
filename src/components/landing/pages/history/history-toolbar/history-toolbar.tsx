import {ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import React, {useEffect, useState} from "react";

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

    const [state, setState] = useState<HistoryToolbarState>(initState);

    useEffect(() => {
        onSettingsChange(state);
    }, [onSettingsChange, state])

    return (
        <ToggleButtonGroup type="radio" name="options" value={state.viewState} className="mb-2"
                           onChange={(newViewState: ViewStateEnum) => {
                               setState((prevState) => ({...prevState, viewState: newViewState}))
                           }}>
            <ToggleButton value={ViewStateEnum.card}>Card</ToggleButton>
            <ToggleButton value={ViewStateEnum.table}>Table</ToggleButton>
        </ToggleButtonGroup>
    )
}