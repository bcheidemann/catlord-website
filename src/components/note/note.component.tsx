import React from "react";

export interface INoteProps {
    style?: React.CSSProperties;
}

export const Note: React.FC<INoteProps> = (props) => {
    return (
        <div style={{
            backgroundColor: '#EC0',
            padding: 10,
            borderRadius: 5,
            textAlign: 'left',
            ...props.style,
        }}>
            {props.children}
        </div>
    )
}