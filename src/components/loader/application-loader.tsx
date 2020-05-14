import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./application-loader.scss";
import {Alert} from "react-bootstrap";
import {setUpI18n} from "../../initializers/i18n";
import {loadAllConfig} from "../../initializers/configLoader";
import {useDispatch} from "react-redux";

export const ApplicationLoader: React.FC = ({children}) => {

    var dispatch = useDispatch();

    const [failed, setFailed] = useState<boolean>(false);
    const [initTasks, setInitTasks] = useState<Promise<any>[]>([]);
    const [doneTasks, setDoneTasks] = useState<number>(0);

    useEffect(() => {
        const tasks: Promise<any>[] = [setUpI18n(), loadAllConfig(dispatch), new Promise((resolve => setTimeout(resolve, 3000)))];
        const preparedTasks = tasks.map(task =>
            task.then(() =>
                setDoneTasks(prevDoneTasks => {
                    return prevDoneTasks + 1;
                }))
                .catch(() => {
                    setFailed(true);
                })
        )
        setInitTasks(preparedTasks);
    }, [dispatch]);

    return (<>{
        doneTasks < initTasks.length || initTasks.length === 0 ? (
            <div className="loader middle">
                <div className="icon">
                    <FontAwesomeIcon icon="file-alt" size="6x"
                                     className={failed ? "animation-shake" : "animation-pulse"}/>
                </div>
                {
                    failed ? <Alert variant={"danger"}>An error occured while loading the application!</Alert> : null
                }
            </div>
        ) : children
    }</>);
}