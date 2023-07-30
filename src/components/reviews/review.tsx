import { Comment } from '../../types/comments';

type ReviewProps = {
	comment: Comment;
}
function Review({comment}: ReviewProps): JSX.Element {
	const date = new Date(comment.date);

	return (
		<li key={comment.id} className="reviews__item">
			<div className="reviews__user user">
				<div className="reviews__avatar-wrapper user__avatar-wrapper">
					<img
						className="reviews__avatar user__avatar"
						src={comment.user.avatarUrl}
						width={54}
						height={54}
						alt={comment.user.name}
					/>
				</div>
				<span className="reviews__user-name">{comment.user.name}</span>
			</div>
			<div className="reviews__info">
				<div className="reviews__rating rating">
					<div className="reviews__stars rating__stars">
						<span style={{ width: `${comment.rating * 20}%` }} />
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<p className="reviews__text">{comment.comment}</p>
				<time className="reviews__time" dateTime={comment.date}>
					{new Intl.DateTimeFormat('en-Us', {month: 'long', year: 'numeric'}).format(date)}
				</time>
			</div>
		</li>
	);
}

export default Review;
