import { FormEvent, useRef } from 'react';
import RatingField from './rating-field';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendComment } from '../../store/api-actions';
import { CommentField } from '../../types/comments';
import { RequestStatus } from '../../const';

type CommentFormProps = {
	id: string | undefined;
}

function CommentForm({id}: CommentFormProps): JSX.Element {
	const commentSendingStatus = useAppSelector((state) => state.commentSendingStatus);
	const dispatch = useAppDispatch();
	const commentRef = useRef<HTMLTextAreaElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement| null>(null);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

	if(commentSendingStatus === RequestStatus.PENDING && buttonRef.current) {
		buttonRef.current.disabled = true;
	}

	if(commentSendingStatus === RequestStatus.SUCCESS && commentRef.current && buttonRef.current) {
		commentRef.current.value = '';
		buttonRef.current.disabled = false;
	}

	return (
		<form onSubmit={handleSubmit} className="reviews__form form" action="#" method="post">
			<label className="reviews__label form__label" htmlFor="review">
				Your review
			</label>
			<RatingField/>
			<textarea
				ref={commentRef}
				className="reviews__textarea form__textarea"
				id="review"
				name="review"
				placeholder="Tell how was your stay, what you like and what can be improved"
			/>
			<div className="reviews__button-wrapper">
				<p className="reviews__help">
					To submit review please make sure to set{' '}
					<span className="reviews__star">rating</span> and describe
					your stay with at least{' '}
					<b className="reviews__text-amount">50 characters</b>.
				</p>
				<button ref={buttonRef}
					className="reviews__submit form__submit button"
					type="submit"
				>
					Submit
				</button>
			</div>
		</form>
	);
}

export default CommentForm;
