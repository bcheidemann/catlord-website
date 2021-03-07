import { observable } from "mobx";
import jwt from 'jsonwebtoken';

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

    public hasValidToken() {
        var token = this.getAccessToken();
    
        if (!token) return false;
    
        var decodedToken = jwt.decode(token, { complete: true });
        var dateNow = new Date();
    
        return decodedToken.payload.exp * 1000 > dateNow.getTime();
    }
}

export const LoginStore = new LoginStoreDef();