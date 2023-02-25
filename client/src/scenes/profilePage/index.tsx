import { useEffect, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import Navbar from 'scenes/navbar';
import FriendListWidget from 'scenes/widgets/FriendsListWidget';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';
import UserWidget from 'scenes/widgets/UserWidget';

import { useAppSelector } from 'store';
import { User } from 'types';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const { userId } = useParams();
  const token = useAppSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setUser(data);
    };
    getUser();
  }, [userId, token]);

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={userId!} picturePath={user.picturePath} />
          <Box margin="2rem 0 " />
          <FriendListWidget userId={userId!} />
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          marginTop={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box margin="2rem 0 " />

          <PostsWidget userId={userId!} />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
