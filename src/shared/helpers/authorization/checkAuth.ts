import {getPercyToken} from '../getPercyToken';

export function checkAuth(authToken: string) {
    const parsedToken = getPercyToken(authToken);

    // todo get
    return parsedToken;
}
