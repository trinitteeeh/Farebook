package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.36

import (
	"context"
	"fmt"

	"github.com/Trinitt/learn-graphql/graph/model"
	"github.com/google/uuid"
)

// CreateStory is the resolver for the createStory field.
func (r *mutationResolver) CreateStory(ctx context.Context, inputStory *model.NewStory) (*model.Story, error) {
	story := &model.Story{
		ID:              uuid.NewString(),
		UserID:          inputStory.UserID,
		Text:            inputStory.Text,
		FontType:        inputStory.FontType,
		PictureURL:      inputStory.PictureURL,
		BackgroundStyle: inputStory.BackgroundStyle,
	}
	return story, r.DB.Save(&story).Error
}

// DeleteStory is the resolver for the deleteStory field.
func (r *mutationResolver) DeleteStory(ctx context.Context, storyID string) (*model.Story, error) {
	story := &model.Story{}
	err := r.DB.First(&story, "id = ?", storyID).Error

	if err != nil {
		return nil, err
	}

	err = r.DB.Delete(&story).Error
	if err != nil {
		return nil, err
	}

	return story, nil
}

// GetAllStory is the resolver for the getAllStory field.
func (r *queryResolver) GetAllStory(ctx context.Context) ([]*model.FetchStory, error) {
	panic(fmt.Errorf("not implemented: GetAllStory - getAllStory"))
}

// GetStoryByUserID is the resolver for the getStoryByUserId field.
func (r *queryResolver) GetStoryByUserID(ctx context.Context, userID string) ([]*model.FetchStory, error) {
	var stories []*model.Story

	if err := r.DB.Where("user_id = ?", userID).Find(&stories).Error; err != nil {
		return nil, err
	}

	var user *model.User

	if err := r.DB.Model(&model.User{}).Where("id= ?", userID).Find(&user).Error; err != nil {
		return nil, err
	}

	var fetchStories []*model.FetchStory

	for _, story := range stories {
		fetchStory := &model.FetchStory{
			ID:              story.ID,
			User:            user,
			Text:            story.Text,
			FontType:        story.FontType,
			PictureURL:      story.PictureURL,
			BackgroundStyle: story.BackgroundStyle,
		}
		fetchStories = append(fetchStories, fetchStory)
	}
	return fetchStories, nil
}