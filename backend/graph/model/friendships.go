package model

type Friendship struct {
	UserID   string `json:"userID"`
	FriendID string `json:"friendID"`
	Status   string `json:"status"`
}
