import { Box, useMediaQuery } from '@mui/material';
import Navbar from 'scenes/navbar';
import UserWidget from 'scenes/widgets/UserWidget';
import { useAppSelector } from 'store';

const Home = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { _id, picturePath } = useAppSelector((state) => state.user!);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          marginTop={isNonMobileScreens ? undefined : '2rem'}
        ></Box>

        {isNonMobileScreens && <Box flexBasis="24%"></Box>}
      </Box>
    </Box>
  );
};

export default Home;
