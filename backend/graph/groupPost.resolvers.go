package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.36

import (
	"context"

	"github.com/Trinitt/learn-graphql/graph/model"
	"github.com/google/uuid"
)

// CreateGroupPost is the resolver for the createGroupPost field.
func (r *mutationResolver) CreateGroupPost(ctx context.Context, groupID string, inputPost model.NewPost) (*model.GroupPost, error) {
	// Create the post
	post := &model.Post{
		ID:          uuid.NewString(),
		PostText:    inputPost.PostText,
		UserID:      inputPost.UserID,
		Privacy:     inputPost.Privacy,
		PublishDate: inputPost.PublishDate,
	}
	if err := r.DB.Create(&post).Error; err != nil {
		return nil, err
	}

	groupPost := &model.GroupPost{
		GroupID: groupID,
		PostID:  post.ID,
	}
	if err := r.DB.Create(&groupPost).Error; err != nil {
		return nil, err
	}

	return groupPost, nil
}