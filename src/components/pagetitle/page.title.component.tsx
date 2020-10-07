import React from "react";

export interface PageTitleProps {
}

export class PageTitle extends React.Component<PageTitleProps, {}> {
    render() {
        return (
            <h1 style={{ textAlign: 'center' }}>Insert Title Here</h1>
        );
    }
}

// <PageTitle titleText='My Title' />
