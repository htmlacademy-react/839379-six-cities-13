import {useState} from 'react';
import { ChangeEvent } from 'react';
import RatingField from './rating-field';

function CommentForm(): JSX.Element {
	const [comment, setComment] = useState('');

	const handleReviewChange = ({target}: ChangeEvent<HTMLTextAreaElement>) => {
		setComment(target.value);
	};

	return (
		<form className="reviews__form form" action="#" method="post">
			<label className="reviews__label form__label" htmlFor="review">
				Your review
			</label>
			<RatingField/>
			<textarea
				onChange={handleReviewChange}
				className="reviews__textarea form__textarea"
				id="review"
				name="review"
				placeholder="Tell how was your stay, what you like and what can be improved"
				value={comment}
			/>
			<div className="reviews__button-wrapper">
				<p className="reviews__help">
					To submit review please make sure to set
					<span className="reviews__star">rating</span> and describe
					your stay with at least
					<b className="reviews__text-amount">50 characters</b>.
				</p>
				<button
					className="reviews__submit form__submit button"
					type="submit"
					disabled
				>
					Submit
				</button>
			</div>
		</form>
	);
}

export default CommentForm;
