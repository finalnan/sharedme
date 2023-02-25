export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath: string;
  location: string;
  occupation: string;
  impressions: number;
  viewedProfile: number;
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
  friends: User[];
}

export interface Post {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  description: string;
  picturePath: string;
  userPicturePath: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  comments: string[];
  __v: 0;
  likes: {
    [key: string]: boolean;
  };
}
