import { hasAnyRoles } from '../auth';
import * as TokenModule from '../token';

describe(' has any role tests', () => {

    test('should return true when empty list', () => {
        const result = hasAnyRoles([]);

        expect(result).toEqual(true);
    });

    test('should return true when user has given role ADMIN', () => {

        jest.spyOn(TokenModule, 'getTokenData').mockReturnValue({
            exp: 0,
            user_name: '',
            authorities: ['ROLE_ADMIN', 'ROLE_OPERATOR'],
        })

        const result = hasAnyRoles(['ROLE_ADMIN']);

        expect(result).toEqual(true);
    });

    test('should return true when user has given role OPERATOR', () => {

        jest.spyOn(TokenModule, 'getTokenData').mockReturnValue({
            exp: 0,
            user_name: '',
            authorities: ['ROLE_ADMIN', 'ROLE_OPERATOR'],
        })

        const result = hasAnyRoles(['ROLE_OPERATOR']);

        expect(result).toEqual(true);
    });

    
    test('should return false when user does not has given role ADMIN', () => {

        jest.spyOn(TokenModule, 'getTokenData').mockReturnValue({
            exp: 0,
            user_name: '',
            authorities: ['ROLE_OPERATOR'],
        })

        const result = hasAnyRoles(['ROLE_ADMIN']);

        expect(result).toEqual(false);
    });

});