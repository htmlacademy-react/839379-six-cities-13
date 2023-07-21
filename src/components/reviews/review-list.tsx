import { Fragment } from 'react';
import { Comments } from '../../types/comments';
import Review from './review';

type ReviewListProps = {
	comments: Comments;
}
function ReviewList({comments}: ReviewListProps): JSX.Element {
	return (
		<Fragment>
			<h2 className="reviews__title">
				Reviews · <span className="reviews__amount">{comments.length}</span>
			</h2>
			<ul className="reviews__list">
				{comments.map((comment) => (
					<Review key={comment.id} comment={comment}/>
				))}
			</ul>
		</Fragment>
	);
}

export default ReviewList;
