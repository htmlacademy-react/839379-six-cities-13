import { Fragment, useRef } from 'react';

function RatingField(): JSX.Element {
	const ratingRef = useRef<null | SVGSVGElement>(null);

	const ratingValues = {
		'1': 'terribly',
		'2': 'badly',
		'3': 'not bad',
		'4': 'good',
		'5': 'perfect',
	};

	return (
		<div className="reviews__rating-form form__rating">
			{Object.entries(ratingValues).reverse().map(([value, title]) => (
				<Fragment key={value}>
					<input
						className="form__rating-input visually-hidden"
						name="rating"
						defaultValue={value}
						id={`${value}-stars`}
						type="radio"
					/>
					<label
						htmlFor={`${value}-stars`}
						className="reviews__rating-label form__rating-label"
						title={title}
					>
						<svg ref={ratingRef} className="form__star-image" width="37" height="33">
							<use xlinkHref="#icon-star"></use>
						</svg>
					</label>
				</Fragment>
			))}
		</div>
	);
}

export default RatingField;


