export function getPercyToken(authorizationHeader: string):string {
    const matches: RegExpMatchArray | null = authorizationHeader.match(/^Token\stoken=([\w\d]+)$/);

    if (!matches) {
        throw new Error('No Authorization header');
    }

    return matches[1];
}
