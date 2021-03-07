import React from "react";
import { LoginStore } from "../stores/login/login.store";

export class BaseScreen<T, S={}> extends React.Component<T, S> {
    private scrollInterval!: NodeJS.Timeout;

    componentDidMount() {

        // If we've been logged in before but the token has expired then
        // clear the token and redirect to /login
        if (LoginStore.getAccessToken() && !LoginStore.hasValidToken()) {
            LoginStore.clearAccessToken();
            window.location.replace('/login');
        }


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