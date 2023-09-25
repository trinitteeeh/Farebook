import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInPage from "./pages/sign-in/index.tsx";
import ErrorPage from "./pages/error/index.tsx";
import HomePage from "./pages/home/index.tsx";
import { AuthContextProvider } from "./setup/context-manager/AuthContextProvider.tsx";
import { AuthorizedRoute } from "./setup/routes/AuthorizedRoute.tsx";
import { UnauthorizedRoute } from "./setup/routes/UnauthorizedRoute.tsx";
import SignupPage from "./pages/sign-up/index.tsx";
import ActivationPage from "./pages/activation/index.tsx";
import ForgetAccountPage from "./pages/forget-account/index.tsx";
import ResetPasswordPage from "./pages/reset-password/index.tsx";
import FriendsPage from "./pages/friends/index.tsx";
import ProfilePage from "./pages/profile/index.tsx";
import CreateStories from "./pages/stories/create/index.tsx";
import ReelsPage from "./pages/reels/index.tsx";
import StoryPage from "./pages/stories/index.tsx";
import MessengerPage from "./pages/messenger/index.tsx";
import CreateReels from "./pages/reels/create/index.tsx";
import GroupPage from "./pages/group/index.tsx";
import CreateGroup from "./pages/group/create/index.tsx";
import SearchPage from "./pages/search/index.tsx";
import NotificationPage from "./pages/notification/index.tsx";
import GroupProfile from "./pages/group/profile/GroupProfile.tsx";

const client = new ApolloClient({
  uri: "http://localhost:7778/query",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/signin",
    element: (
      <UnauthorizedRoute>
        <SignInPage />
      </UnauthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: (
      <UnauthorizedRoute>
        <SignupPage />
      </UnauthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/activate/:id",
    element: (
      <UnauthorizedRoute>
        <ActivationPage />
      </UnauthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/reset-password/:id",
    element: (
      <UnauthorizedRoute>
        <ResetPasswordPage />
      </UnauthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/forget-account",
    element: (
      <UnauthorizedRoute>
        <ForgetAccountPage />
      </UnauthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: (
      <AuthorizedRoute>
        <HomePage />
      </AuthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/friends",
    element: (
      <AuthorizedRoute>
        <FriendsPage />
      </AuthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/:id",
    element: (
      <AuthorizedRoute>
        <ProfilePage />
      </AuthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/stories/create",
    element: (
      <AuthorizedRoute>
        <CreateStories />
      </AuthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/reels",
    element: (
      <AuthorizedRoute>
        <ReelsPage />
      </AuthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/stories",
    element: (
      <AuthorizedRoute>
        <StoryPage />
      </AuthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/messenger",
    element: (
      <AuthorizedRoute>
        <MessengerPage />
      </AuthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/reels/create",
    element: (
      <AuthorizedRoute>
        <CreateReels />
      </AuthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/group",
    element: (
      <AuthorizedRoute>
        <GroupPage />
      </AuthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/group/profile/:id",
    element: (
      <AuthorizedRoute>
        <GroupProfile />
      </AuthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/group/create",
    element: (
      <AuthorizedRoute>
        <CreateGroup />
      </AuthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/search/:search",
    element: (
      <AuthorizedRoute>
        <SearchPage />
      </AuthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/search/",
    element: (
      <AuthorizedRoute>
        <SearchPage />
      </AuthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/notification",
    element: (
      <AuthorizedRoute>
        <NotificationPage />
      </AuthorizedRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);
