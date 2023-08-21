import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getComments = (state: State) => state[NameSpace.Comments].comments;

export const getCommentsFetchingStatus = (state: State) => state[NameSpace.Comments].commentsFetchingStatus;

export const getCommentsSendingStatus = (state: State) => state[NameSpace.Comments].commentSendingStatus;
