import { tags, defaultState } from './reducers';
import {
    TAGS_LOADED_SUCCESS,
} from './types';

describe('tags', () => {
    test('should manage TAGS_LOADED_SUCCESS action', () => {
        const payload = ['tweeet1'];
        const action = {
            type: TAGS_LOADED_SUCCESS,
            payload,
        };
        const expectedState = {
            loaded: true,
            data: payload,
        };
        expect(tags(defaultState.tags, action)).toEqual(expectedState);
    });

    test('should manage any action when initial state is undefined', () => {
        const action = {
            type: 'ANY',
        };
        expect(tags(undefined, action)).toBe(defaultState.tags);
    });

});

