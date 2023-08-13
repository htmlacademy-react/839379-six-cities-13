import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { RequestStatus } from '../../const';
import { CommentsData } from '../../types/state';
import { fetchComments, sendComment } from '../api-actions';

const initialState: CommentsData = {
	commentsFetchingStatus: RequestStatus.IDLE,
	comments: [],
	commentSendingStatus: RequestStatus.IDLE,
	error: null
};

export const commentsData = createSlice({
	name: NameSpace.Comments,
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchComments.pending, (state) => {
				state.commentsFetchingStatus = RequestStatus.PENDING;
			})
			.addCase(fetchComments.fulfilled, (state, action) => {
				state.commentsFetchingStatus = RequestStatus.SUCCESS;
				state.comments = action.payload;
			})
			.addCase(fetchComments.rejected, (state) => {
				state.commentsFetchingStatus = RequestStatus.ERROR;
			})
			.addCase(sendComment.pending, (state) => {
				state.commentSendingStatus = RequestStatus.PENDING;
			})
			.addCase(sendComment.fulfilled, (state, action) => {
				state.commentSendingStatus = RequestStatus.SUCCESS;
				state.comments.push(action.payload);
			})
			.addCase(sendComment.rejected, (state) => {
				state.commentSendingStatus = RequestStatus.ERROR;
			});
	},
});


