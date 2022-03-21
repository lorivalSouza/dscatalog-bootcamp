import { Role } from 'types/role';
import { getTokenData } from './token';



export const isAuthenticated = (): boolean => {
  const tokenData = getTokenData();

  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

export const hasAnyRoles = (roles: Role[]): boolean => {
  if (roles.length === 0) {
    return true;
  }
  const tokendata = getTokenData();

  if (tokendata !== undefined) {
    return roles.some((role) => tokendata.authorities.includes(role));
  }
  /* optional to function 
    if (tokendata !== undefined) {
      for(var i =0; i < roles.length; i++){
        if(tokendata.authorities.includes(roles[i])){
          return true;
        }
      }
    } */
  return false;
};
