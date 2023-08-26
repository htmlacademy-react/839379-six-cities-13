import { ChangeEvent, Fragment } from 'react';
import { useAppSelector } from '../../hooks';
import { getCommentsSendingStatus } from '../../store/comments-data/selectors';
import { RequestStatus } from '../../const';

type RatingFieldProps = {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	rating: string;
}

function RatingField({onChange, rating} : RatingFieldProps): JSX.Element {
	const commentSendingStatus = useAppSelector(getCommentsSendingStatus);
	const isInputDisabled = commentSendingStatus === RequestStatus.Pending;

	const ratingValue = {
		'1': 'terribly',
		'2': 'badly',
		'3': 'not bad',
		'4': 'good',
		'5': 'perfect',
	};

	return (
		<div className="reviews__rating-form form__rating">
			{Object.entries(ratingValue).reverse().map(([value, title]) => (
				<Fragment key={value}>
					<input
						onChange={onChange}
						className="form__rating-input visually-hidden"
						name="rating"
						defaultValue={value}
						id={`${value}-stars`}
						type="radio"
						disabled={isInputDisabled}
						checked={rating === value}
					/>
					<label
						htmlFor={`${value}-stars`}
						className="reviews__rating-label form__rating-label"
						title={title}
					>
						<svg className="form__star-image" width="37" height="33">
							<use xlinkHref="#icon-star"></use>
						</svg>
					</label>
				</Fragment>
			))}
		</div>
	);
}

export default RatingField;


