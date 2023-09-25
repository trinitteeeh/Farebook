package model

type Reel struct {
	ID       string `json:"id"`
	UserID   string `json:"userID"`
	Text     string `json:"text"`
	MediaURL string `json:"mediaURL"`
}
