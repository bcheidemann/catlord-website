import React from "react";

export class BaseScreen<T, S={}> extends React.Component<T, S> {
    private scrollInterval!: NodeJS.Timeout;

    componentDidMount() {
        let lastScrollTop = {
            body: document.body.scrollTop,
            documentElement: document.documentElement.scrollTop,
        }
        this.scrollInterval = setInterval(() => {
            if (document.body.scrollTop <= 1 && document.documentElement.scrollTop <= 1) {
                this.clearScroll();
            }
            else if (lastScrollTop.body !== document.body.scrollTop || lastScrollTop.documentElement !== document.documentElement.scrollTop) {
                this.clearScroll();
            }
            document.body.scrollTop /= 1.05;
            document.documentElement.scrollTop /= 1.05;
            lastScrollTop.body = document.body.scrollTop;
            lastScrollTop.documentElement = document.documentElement.scrollTop;
        }, 10);
    }

    componentWillUnmount() {
        this.clearScroll();
    }

    protected clearScroll = () => {
        if (this.scrollInterval) {
            clearInterval(this.scrollInterval);
        }
    }
}