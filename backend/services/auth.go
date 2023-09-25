package service

import (
	"context"
	"fmt"

	"github.com/Trinitt/learn-graphql/graph/model"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

func UserLogin(ctx context.Context, email string, password string) (string, error) {
	getUser, err := UserGetByEmail(ctx, email)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return "", &gqlerror.Error{
				Message: "user not found",
			}
		}
		return "", err
	}

	if !model.CheckPasswordHash(password, getUser.Password) {
		return "Wrong password", nil
	}

	if !getUser.IsAuth {
		fmt.Printf("masuk")
		return "Account has not been verified", nil
	}

	token, err := JwtGenerate(ctx, getUser.ID)
	if err != nil {
		return "", err
	}

	return token, nil
}
