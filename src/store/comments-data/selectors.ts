import { NameSpace, RequestStatus } from '../../const';
import { Comments } from '../../types/comments';
import { State } from '../../types/state';

export const getComments = (state: State): Comments => state[NameSpace.Comments].comments;


export const getCommentsFetchingStatus = (state: State): typeof RequestStatus[keyof typeof RequestStatus] => state[NameSpace.Comments].commentsFetchingStatus;

export const getCommentsSendingStatus = (state: State): typeof RequestStatus[keyof typeof RequestStatus] => state[NameSpace.Comments].commentSendingStatus;
