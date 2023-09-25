package model

type Post struct {
	ID          string `json:"id"`
	PostText    string `json:"postText"`
	UserID      string `json:"userId"`
	Privacy     string `json:"privacy"`
	PublishDate string `json:"publishDate"`
}
