export type Comment = {
	id: string;
	date: string;
	user: {
	name: string;
	avatarUrl: string;
	isPro: boolean;
	};
	comment: string;
	rating: number;
};

export type Comments = Comment[];

export type NewComment = Pick<Comment, 'id' | 'comment' | 'rating'>

export type CommentField = HTMLFormElement & {
	review: HTMLTextAreaElement;
	rating: HTMLInputElement;
};
