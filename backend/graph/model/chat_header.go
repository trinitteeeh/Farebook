package model

type ChatHeader struct {
	ID        string `json:"id"`
	CreatedAt string `json:"createdAt"`
	UserID1   string `json:"userID1"`
	UserID2   string `json:"userID2"`
}
