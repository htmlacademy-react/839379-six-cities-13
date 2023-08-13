import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';

export const getAuthorizationStatus = (state: State): typeof AuthorizationStatus[keyof typeof AuthorizationStatus] => state[NameSpace.User].authorizationStatus;
