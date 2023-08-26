import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { RequestStatus } from '../../const';
import { CommentsData } from '../../types/state';
import { fetchComments, sendComment } from '../api-actions';

const initialState: CommentsData = {
	commentsFetchingStatus: RequestStatus.Idle,
	comments: [],
	commentSendingStatus: RequestStatus.Idle,
};

export const commentsData = createSlice({
	name: NameSpace.Comments,
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchComments.pending, (state) => {
				state.commentsFetchingStatus = RequestStatus.Pending;
			})
			.addCase(fetchComments.fulfilled, (state, action) => {
				state.commentsFetchingStatus = RequestStatus.Success;
				state.comments = action.payload;
			})
			.addCase(sendComment.pending, (state) => {
				state.commentSendingStatus = RequestStatus.Pending;
			})
			.addCase(sendComment.fulfilled, (state, action) => {
				state.commentSendingStatus = RequestStatus.Success;
				state.comments.push(action.payload);
			})
			.addCase(sendComment.rejected, (state) => {
				state.commentSendingStatus = RequestStatus.Error;
			});
	},
});


