package database

import (
	"github.com/Trinitt/learn-graphql/graph/model"
	"github.com/Trinitt/learn-graphql/helper"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var database *gorm.DB

func GetInstance() *gorm.DB {
	if database == nil {
		dsn := helper.GoDotEnvVariable("DATABASE_URL")
		// fmt.Print(dsn)
		db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
		// fmt.Print(db)

		if err != nil {
			panic(err)
		}

		database = db
	}

	return database
}

func MigrateTable() {
	db := GetInstance()
	db.AutoMigrate(&model.User{}, &model.Post{}, &model.PostLike{}, &model.PostPicture{}, &model.PostComment{}, &model.PostCommentReply{}, &model.Story{}, &model.Friendship{}, &model.Reel{}, &model.ChatHeader{}, &model.ChatDetail{}, &model.Group{}, &model.GroupMember{}, &model.GroupPost{}, &model.Notification{})
}
