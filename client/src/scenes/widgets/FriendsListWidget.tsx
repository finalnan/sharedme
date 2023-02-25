import { useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useAppDispatch, useAppSelector } from 'store';
import { setFriends } from 'store/authSlice';

interface Props {
  userId: string;
}

const FriendListWidget: React.FC<Props> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const { palette } = useTheme();
  const token = useAppSelector((state) => state.token);
  const friends = useAppSelector((state) => state.user?.friends);

  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/friends`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      dispatch(setFriends({ friends: data }));
    };

    getFriends();
  }, [userId, token, dispatch]);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight={500}
        sx={{ marginBottom: '1.5rem' }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends?.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
