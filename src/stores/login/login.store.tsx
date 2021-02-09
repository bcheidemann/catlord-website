import { observable } from "mobx";

class LoginStoreDef {
    public accessToken = observable.box<string>();

    public getAccessToken() {
        const inMemAccessToken = this.accessToken.get();
        if (inMemAccessToken) {
            return inMemAccessToken;
        }
        const localAccessToken = localStorage.getItem('accessToken');
        if (localAccessToken) {
            return localAccessToken;
        }
    }

    public clearAccessToken() {
        this.accessToken.set('');
        localStorage.removeItem('accessToken');
    }
}

export const LoginStore = new LoginStoreDef();