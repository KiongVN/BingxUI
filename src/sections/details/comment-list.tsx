import { Avatar, Button, Paper, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Iconify from "src/components/iconify";
import { useBoolean } from "src/hooks/use-boolean";
import { fDate } from "src/utils/format-time";

interface Props {
  comment: {
    id: string;
    message: string;
    createdAt: Date;
    author: {
      id: string;
      name: string;
      avatarUrl: string;
    }
  }
}
export default function RenderCommentList({ comment }: Props){

  const reply = useBoolean();

return (  <Stack spacing={1.5} sx={{ px: 3, pb: 2 }}>
      <Stack key={comment.id} direction="row" spacing={2}>
        <Avatar alt={comment.author.name} src={comment.author.avatarUrl} />

        <Paper
          sx={{
            p: 1.5,
            flexGrow: 1,
            bgcolor: 'background.neutral',
          }}
        >
          <Stack direction='row' justifyContent='space-between' >
            <Stack
              sx={{ mb: 0.5 }}
              alignItems={{ sm: 'flex-start' }}
              justifyContent="flex-start"
              direction={{ xs: 'column', sm: 'column' }}
            >
              <Box sx={{ typography: 'subtitle2' }}>{comment.author.name}</Box>

              <Box sx={{ typography: 'caption', color: 'text.disabled' }}>
                {fDate(comment.createdAt)}
              </Box>
            </Stack>
            <Button
              size="small"
              color={reply.value ? 'primary' : 'inherit'}
              startIcon={<Iconify icon="solar:pen-bold" width={16} />}
              onClick={reply.onToggle}
            >
              Reply
            </Button>
          </Stack>

          <Box sx={{ typography: 'body2', color: 'text.secondary' }}>{comment.message}</Box>
          {reply.value && (
            <Box sx={{ mt: 2 }}>
              <TextField fullWidth autoFocus placeholder="Write comment..." />
            </Box>
           )}
        </Paper>
      </Stack>

  </Stack>)
}

