import { getAdverts, getIsLogged } from './selectors';

describe('getAdverts', () => {
    test('should return adverts object', () => {
        const data = [{ id: 1 }, { id: 2, content: 'Hi' }];
        const state = {
            adverts: {
                data,
            },
        };
        expect(getAdverts(state)).toMatchObject(data);
    });
});

describe('getIsLogged', () => {
    test('should return Auth object', () => {
        const Auth = true;
        const LoggedState = {
            auth: true,
        };
        expect(getIsLogged(LoggedState)).toBe(Auth);
    });
});