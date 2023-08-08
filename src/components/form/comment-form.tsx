import {FormEvent} from 'react';
import RatingField from './rating-field';
import { useAppDispatch } from '../../hooks';
import { sendComment } from '../../store/api-actions';
import { CommentField } from '../../types/comments';

type CommentFormProps = {
	id: string;
}

function CommentForm({id}: CommentFormProps): JSX.Element {
	const dispatch = useAppDispatch();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget as CommentField;
		dispatch(sendComment({
			id,
			comment: form.review.value,
			rating: Number(form.rating.value),
		}));
	};


	return (
		<form onSubmit={handleSubmit} className="reviews__form form" action="#" method="post">
			<label className="reviews__label form__label" htmlFor="review">
				Your review
			</label>
			<RatingField/>
			<textarea
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
				<button
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
