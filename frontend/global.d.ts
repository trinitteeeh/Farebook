interface User {
  id: string;
  firstName: string;
  surename: string;
  email: string;
  gender: string;
  dob: string;
  profileURL?: string;
}

interface CssStyle {
  backgroundImage?: string;
  backgroundColor?: string;
}

interface FontType {
  value: string;
  label: string;
}

interface Story {
  id: string;
  text: string;
  backgroundStyle: string;
  fontType: string;
  pictureURL: string;
  user: User;
}

interface Reel {
  id: string;
  user: User;
  mediaURL: string;
  text: string;
}

interface ButtonProps {
  text: string;
  onClick?: () => void;
  color?: string;
  backgroundColor?: string;
}

interface PostType {
  id: string;
  firstName: string;
  surename: string;
  postText: string;
  user: User;
  mediaLink: string[];
  likesCount: number;
  isLiked: boolean;
}

interface ChatHeader {
  id: string;
  user1: User;
  user2: User;
  createdAt: string;
}

interface ChatDetail {
  id: string;
  headerID: string;
  sender: User;
  receiver: User;
  text: string;
  createdAt: string;
  mediaURL: string;
}

interface Member {
  user: User;
  role: string;
  status: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  profileURL: string;
  members: Member[];
  posts: PostType[];
  privacy: string;
}

interface ScrollbarData {
  type: string;
  posts: PostType[] | null;
  profile: User[] | null;
  group: Group[] | null;
}

interface Notification {
  id: string;
  user: User;
  profile: User;
  createdAt: string;
  text: string;
}
