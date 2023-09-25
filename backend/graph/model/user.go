package model

import "golang.org/x/crypto/bcrypt"

type User struct {
	ID         string `json:"id"`
	FirstName  string `json:"firstName"`
	Surename   string `json:"surename"`
	Email      string `json:"email" gorm:"unique"`
	Password   string `json:"password"`
	Gender     string `json:"gender"`
	Dob        string `json:"dob"`
	ProfileURL string `json:"profileURL"`
	IsAuth     bool   `json:isAuth`
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
