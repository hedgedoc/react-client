import React  from "react";
import "./user-avatar.scss"

export interface UserAvatarProps {
    name: string;
    photo: string;
    color?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, photo, color}) => {
    return (
        <div className='d-inline-flex align-items-center' style={{borderLeftStyle: "solid", borderLeftWidth: "3px", borderLeftColor: color, height: "30px"}}>
            <img
                src={photo}
                className="user-avatar"
                alt={`Avatar of ${name}`}
            /><span style={{fontSize: "1rem"}}>{name}</span>
        </div>
    );
}

export {UserAvatar}
