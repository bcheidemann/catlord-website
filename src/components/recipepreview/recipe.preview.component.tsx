import React from "react";

export interface RecipePreviewProps {
    title: string;
    description: string;
}

export class RecipePreview extends React.Component<RecipePreviewProps, {}> {
    render() {
        return (
            <div style={{ backgroundColor: 'gray', display: 'flex', flexDirection: 'row', padding: 20, borderColor: 'black', borderWidth: 2, borderStyle: 'solid', borderRadius: 10, width: '100%' }}>
                <div style={{ paddingRight: 10, flex: 1 }}>
                    <h2>{this.props.title}</h2>
                    <div style={{ textAlign: 'left', textJustify: 'inter-character', overflowX: 'hidden', height: 86 }}>
                        {this.props.description}
                    </div>
                </div>
                <div style={{ paddingLeft: 10 }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
