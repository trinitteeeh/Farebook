package service

import (
	"context"

	"github.com/Trinitt/learn-graphql/database"
	"github.com/Trinitt/learn-graphql/graph/model"
)

func UserGetByID(ctx context.Context, id string) (*model.User, error) {
	db := database.GetInstance()

	var user model.User
	if err := db.Model(user).Where("id = ?", id).Take(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func UserGetByEmail(ctx context.Context, email string) (*model.User, error) {
	db := database.GetInstance()

	var user model.User
	if err := db.Model(user).Where("email = ?", email).Take(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}
