import React from "react";

export interface PageItemProps {
    onClick: (index: number) => void
    index: number
}


export const PageItem: React.FC<PageItemProps> = ({index, onClick}) => {
    return (
        <li className="page-item">
            <a href={"#"} className="page-link" role="button" onClick={() => onClick(index)}>
                {index + 1}
            </a>
        </li>
    );
}