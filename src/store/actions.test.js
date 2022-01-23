import { advertsLoaded, authLogin } from "./action";
import { ADVERTS_LOADED_SUCCESS } from "./types";

describe("advertsLoaded", () => {
    test("deberá devolver una acción de tipo ADVERTS_LOADED_SUCCESS", () => {
        const adverts = "adverts";
        const expectedResult = {
            type: ADVERTS_LOADED_SUCCESS,
            payload: adverts,
        };
        expect(advertsLoaded(adverts)).toEqual(expectedResult);
    });
});

describe('authLogin', () => {
    const checked = false;
    const credentials = 'credentials';
    const action = authLogin(checked, credentials);
    describe('when login api resolves', () => {
        const api = { auth: { login: jest.fn().mockResolvedValue() } };
        const dispatch = jest.fn();
        const getState = () => { };
        const history = {
            location: {},
            replace: jest.fn(),
        };

        test('should redirect to "/"', async () => {
            await action(dispatch, getState, { api, history });
            expect(history.replace).toHaveBeenCalledWith({ pathname: '/' });
        });

        test('should call api.auth.login', () => {
            action(dispatch, getState, { api, history });
            expect(api.auth.login).toHaveBeenCalledWith(checked, credentials);
        });
    });
});
