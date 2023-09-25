package model

type Story struct {
	ID              string `json:"id"`
	UserID          string `json:"userID"`
	Text            string `json:"text"`
	FontType        string `json:"fontType"`
	PictureURL      string `json:"pictureURL"`
	BackgroundStyle string `json:"backgroundStyle"`
}
