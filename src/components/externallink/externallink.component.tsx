import React from "react";

export interface IExternalLinkProps {
    url: string;
}

export const ExternalLink: React.FC<IExternalLinkProps> = ({url, children}) => {
    return (
        <a
            href={url}
            target={"_blank"}
            rel={"noopener noreferrer"}
        >
            {children}
        </a>
    )
}