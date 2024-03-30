import { useState, useRef, useCallback } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';
// types
import { IUserProfilePost } from 'src/types/user';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// utils
import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import RenderCommentList from './comment-list';

// ----------------------------------------------------------------------

interface Props {
  post: IUserProfilePost;
}

export default function InsightView({ post }: Props) {
  const { user } = useMockedUser();

  const reply = useBoolean();

  const commentRef = useRef<HTMLInputElement>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState('');

  const handleChangeMessage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }, []);

  const handleAttach = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);

  const handleClickComment = useCallback(() => {
    if (commentRef.current) {
      commentRef.current.focus();
    }
  }, []);

  const renderHead = (
    <CardHeader
      disableTypography
      avatar={<Avatar src='https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg' alt={user?.displayName} />}
      title={
        <Link color="inherit" variant="subtitle1">
          {user?.displayName}
        </Link>
      }
      subheader={
        <Box sx={{ color: 'text.disabled', typography: 'caption', mt: 0.5 }}>
          {fDate(post.createdAt)}
        </Box>
      }
      action={
        <IconButton>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      }
    />
  );

  const renderCommentList = (
    <Stack spacing={1.5} sx={{ px: 3, pb: 2 }}>

    </Stack>
  );

  const renderInput = (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      sx={{
        p: (theme) => theme.spacing(0, 3, 3, 3),
      }}
    >
      <Avatar src='https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg' alt={user?.displayName} />

      <InputBase
        fullWidth
        value={message}
        inputRef={commentRef}
        placeholder="Write a comment…"
        onChange={handleChangeMessage}
        endAdornment={
          <InputAdornment position="end" sx={{ mr: 1 }}>
            <IconButton size="small" onClick={handleAttach}>
              <Iconify icon="solar:gallery-add-bold" />
            </IconButton>

            <IconButton size="small">
              <Iconify icon="eva:smiling-face-fill" />
            </IconButton>
          </InputAdornment>
        }
        sx={{
          pl: 1.5,
          height: 40,
          borderRadius: 1,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
        }}
      />

      <input type="file" ref={fileRef} style={{ display: 'none' }} />
    </Stack>
  );

  const renderActions = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        p: (theme) => theme.spacing(2, 3, 3, 3),
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            color="error"
            icon={<Iconify icon="solar:heart-bold" />}
            checkedIcon={<Iconify icon="solar:heart-bold" />}
          />
        }
        label={fShortenNumber(post.personLikes.length)}
        sx={{ mr: 1 }}
      />

      {!!post.personLikes.length && (
        <AvatarGroup
          sx={{
            [`& .${avatarGroupClasses.avatar}`]: {
              width: 32,
              height: 32,
            },
          }}
        >
          {post.personLikes.map((person) => (
            <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
          ))}
        </AvatarGroup>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <IconButton onClick={handleClickComment}>
        <Iconify icon="solar:chat-round-dots-bold" />
      </IconButton>

      <IconButton>
        <Iconify icon="solar:share-bold" />
      </IconButton>
    </Stack>
  );

  return (
    <Card>
      {renderHead}

      <Typography
        variant="body2"
        sx={{
          p: (theme) => theme.spacing(3, 3, 2, 3),
        }}
      >
        {post.message}
      </Typography>

      <Box sx={{ p: 1 }}>
        <Image alt={post.media} src={post.media}  sx={{ borderRadius: 1.5, width: 200}} />
      </Box>

      {renderActions}


      {!!post.comments.length && post.comments.map((comment) => <RenderCommentList key={comment.id} comment={comment}/>)}


      {renderInput}
    </Card>
  );
}
