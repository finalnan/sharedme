import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { setPosts } from 'store/authSlice';
import PostWidget from './PostWidget';

interface Props {
  userId: string;
  isProfile?: boolean;
}

const PostsWidget: React.FC<Props> = ({ userId, isProfile = false }) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts);
  const token = useAppSelector((state) => state.token);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('http://localhost:3001/posts', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
      const response = await fetch(
        `http://localhost:3001/posts/${userId}/posts`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    };

    if (isProfile) getUserPosts();
    else getPosts();
  }, [userId, token, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
