// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type FetchChatDetail struct {
	ID        string `json:"id"`
	HeaderID  string `json:"headerID"`
	CreatedAt string `json:"createdAt"`
	Sender    *User  `json:"sender"`
	Receiver  *User  `json:"receiver"`
	Text      string `json:"text"`
	MediaURL  string `json:"mediaURL"`
}

type FetchChatHeader struct {
	ID        string `json:"id"`
	CreatedAt string `json:"createdAt"`
	User1     *User  `json:"user1"`
	User2     *User  `json:"user2"`
}

type FetchGroup struct {
	ID          string              `json:"id"`
	Name        string              `json:"name"`
	Description string              `json:"description"`
	CreatedAt   string              `json:"createdAt"`
	Members     []*FetchGroupMember `json:"members"`
	ProfileURL  string              `json:"profileURL"`
	Privacy     string              `json:"privacy"`
	Posts       []*FetchPost        `json:"posts"`
}

type FetchGroupMember struct {
	User   *User  `json:"user"`
	Role   string `json:"role"`
	Status string `json:"status"`
}

type FetchNotification struct {
	ID        string `json:"id"`
	User      *User  `json:"user"`
	Profile   *User  `json:"profile"`
	CreatedAt string `json:"createdAt"`
	Text      string `json:"text"`
}

type FetchPost struct {
	ID          string   `json:"id"`
	PostText    string   `json:"postText"`
	User        *User    `json:"user"`
	Privacy     string   `json:"privacy"`
	PublishDate string   `json:"publishDate"`
	LikesCount  int      `json:"likesCount"`
	MediaLink   []string `json:"mediaLink"`
	IsLiked     bool     `json:"isLiked"`
}

type FetchPostCommentReplies struct {
	ID          string       `json:"id"`
	User        *User        `json:"user"`
	PostID      string       `json:"postId"`
	CommentText string       `json:"commentText"`
	Parent      *PostComment `json:"parent,omitempty"`
}

type FetchPostComments struct {
	ID          string                     `json:"id"`
	User        *User                      `json:"user"`
	PostID      string                     `json:"postId"`
	CommentText string                     `json:"commentText"`
	ParentID    string                     `json:"parentId"`
	Replies     []*FetchPostCommentReplies `json:"replies"`
}

type FetchPostLike struct {
	PostID string `json:"postId"`
	User   *User  `json:"user"`
}

type FetchReel struct {
	ID       string `json:"id"`
	User     *User  `json:"user"`
	Text     string `json:"text"`
	MediaURL string `json:"mediaURL"`
}

type FetchStory struct {
	ID              string `json:"id"`
	User            *User  `json:"user"`
	Text            string `json:"text"`
	FontType        string `json:"fontType"`
	PictureURL      string `json:"pictureURL"`
	BackgroundStyle string `json:"backgroundStyle"`
}

type Group struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	CreatedAt   string `json:"createdAt"`
	ProfileURL  string `json:"profileURL"`
	Privacy     string `json:"privacy"`
}

type GroupMember struct {
	GroupID  string `json:"groupID"`
	MemberID string `json:"memberID"`
	JoinedAt string `json:"joinedAt"`
	Status   string `json:"status"`
	Role     string `json:"role"`
}

type GroupPost struct {
	GroupID string `json:"groupId"`
	PostID  string `json:"postId"`
}

type NewPost struct {
	UserID      string `json:"userId"`
	PostText    string `json:"postText"`
	Privacy     string `json:"privacy"`
	PublishDate string `json:"publishDate"`
}

type NewReel struct {
	UserID   string `json:"userID"`
	Text     string `json:"text"`
	MediaURL string `json:"mediaURL"`
}

type NewStory struct {
	UserID          string `json:"userID"`
	Text            string `json:"text"`
	FontType        string `json:"fontType"`
	PictureURL      string `json:"pictureURL"`
	BackgroundStyle string `json:"backgroundStyle"`
}

type NewUser struct {
	FirstName  string `json:"firstName"`
	Surename   string `json:"surename"`
	Email      string `json:"email"`
	Dob        string `json:"dob"`
	Gender     string `json:"gender"`
	Password   string `json:"password"`
	ProfileURL string `json:"profileURL"`
	IsAuth     bool   `json:"isAuth"`
}

type Notification struct {
	ID        string `json:"id"`
	UserID    string `json:"userID"`
	ProfileID string `json:"profileID"`
	CreatedAt string `json:"createdAt"`
	Text      string `json:"text"`
}

type PostCommentReply struct {
	ID          string `json:"id"`
	PostID      string `json:"postId"`
	UserID      string `json:"userId"`
	CommentText string `json:"commentText"`
	ParentID    string `json:"parentId"`
}

type NewChatHeader struct {
	UserID1 string `json:"userId1"`
	UserID2 string `json:"userId2"`
}
