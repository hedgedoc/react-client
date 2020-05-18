import React from "react";
import {TaskBar} from "./task-bar/task-bar";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../redux";
import {EditorMode} from "../../redux/editor/types";
import {EditorWindow} from "./editor-window/editor-window";
import {MarkdownPreview} from "./markdown-preview/markdown-preview";

const Editor: React.FC = () => {
    const editorMode = useSelector((state: ApplicationState) => state.editorConfig.editorMode);
    let editor = null;
    if (editorMode === EditorMode.EDITOR) {
        editor = <EditorWindow/>;
    } else if (editorMode === EditorMode.PREVIEW) {
        editor = <MarkdownPreview/>;
    } else if (editorMode === EditorMode.BOTH) {
        editor = (
            <div>
                <EditorWindow/>
                <MarkdownPreview/>
            </div>
        )
    }

    return (
        <div className={"d-flex flex-column vh-100"}>
            <TaskBar/>
            <div className={"flex-fill"}>
                {editor}
            </div>
        </div>
    )
}

export {Editor}
