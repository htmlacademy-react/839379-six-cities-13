import { Fragment } from 'react';
import Review from './review';
import { useAppSelector } from '../../hooks';
import { getComments } from '../../store/comments-data/selectors';

const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 10;

function ReviewList(): JSX.Element {
	const comments = useAppSelector(getComments);
	const sortedComments = [...comments]
		.sort((a,b) => Date.parse(b.date) - Date.parse(a.date)).slice(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);

	return (

		<Fragment>
			<h2 className="reviews__title">
				Reviews · <span className="reviews__amount">{comments.length}</span>
			</h2>
			<ul className="reviews__list">
				{sortedComments.map((comment) => (
					<Review key={comment.id} comment={comment}/>
				))}
			</ul>
		</Fragment>
	);
}

export default ReviewList;
