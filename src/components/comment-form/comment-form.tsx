import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import RatingField from './rating-field';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendComment } from '../../store/api-actions';
import { CommentField } from '../../types/comments';
import { RequestStatus } from '../../const';
import { getCommentsSendingStatus } from '../../store/comments-data/selectors';

const MIN_TEXT_LENGTH = 50;
const MAX_TEXT_LENGTH = 300;


type CommentFormProps = {
	id: string | undefined;
}

function CommentForm({id}: CommentFormProps): JSX.Element {
	const commentSendingStatus = useAppSelector(getCommentsSendingStatus);
	const dispatch = useAppDispatch();
	const [text, setText] = useState('');
	const [rating, setRating] = useState('');
	const formRef = useRef<HTMLFormElement | null>(null);
	const isSuccess = commentSendingStatus === RequestStatus.Success;
	const isFormDisabled = commentSendingStatus === RequestStatus.Pending || text.length < MIN_TEXT_LENGTH || text.length > MAX_TEXT_LENGTH || rating === '';
	const isInputDisabled = commentSendingStatus === RequestStatus.Pending;

	const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setText(event.target.value);
	};

	const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
		setRating(event.target.value);
	};

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget as CommentField;
		if(id) {
			dispatch(sendComment({
				id,
				comment: form.review.value,
				rating: Number(form.rating.value),
			}));
		}
	};

	useEffect(() => {
		if(isSuccess) {
			formRef.current?.reset();
			setText('');
			setRating('');
		}
	}, [isSuccess]);

	return (
		<form onSubmit={handleFormSubmit} className="reviews__form form" action="#" method="post" ref={formRef}>
			<label className="reviews__label form__label" htmlFor="review">
				Your review
			</label>
			<RatingField onChange={handleRatingChange} rating={rating}/>
			<textarea
				onChange={handleTextChange}
				className="reviews__textarea form__textarea"
				id="review"
				name="review"
				placeholder="Tell how was your stay, what you like and what can be improved"
				value={text}
				disabled={isInputDisabled}
			/>
			<div className="reviews__button-wrapper">
				<p className="reviews__help">
					To submit review please make sure to set{' '}
					<span className="reviews__star">rating</span> and describe
					your stay with at least{' '}
					<b className="reviews__text-amount">50 characters</b>.
				</p>
				<button
					className="reviews__submit form__submit button"
					type="submit"
					disabled={isFormDisabled}
				>
					Submit
				</button>
			</div>
		</form>
	);
}

export default CommentForm;
