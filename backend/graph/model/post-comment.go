package model

type PostComment struct {
	ID          string `json:"id"`
	PostID      string `json:"postId"`
	UserID      string `json:"userId"`
	CommentText string `json:"commentText"`
}
