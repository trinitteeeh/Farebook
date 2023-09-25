package model

type ChatDetail struct {
	ID         string `json:"id"`
	HeaderID   string `json:"headerID"`
	CreatedAt  string `json:"createdAt"`
	SenderID   string `json:"senderID"`
	ReceiverID string `json:"receiverID"`
	Text       string `json:"text"`
	MediaURL   string `json:"mediaURL"`
}
