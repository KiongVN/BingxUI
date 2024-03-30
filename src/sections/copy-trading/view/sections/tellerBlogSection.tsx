// @mui
import { Avatar, Card, Grid, Link, Pagination, SxProps, Theme, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// components
import Iconify from 'src/components/iconify';

interface sectionProps {
  title: string,
  blueText: string,
  sx?: SxProps<Theme>
}

export const TellersBlogSection = ({ title, blueText, sx }: sectionProps) => (
  <Grid container spacing={2} marginBottom={4} sx={sx}>
    <Grid xs={12} md={12} lg={12} marginY={4}>
      <Typography variant="h3" >
        {title}
      </Typography>
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
      <BlogItem blueText={blueText} />
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
      <BlogItem blueText={blueText} />
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
      <BlogItem blueText={blueText} />
    </Grid>
    <Grid xs={12} md={12} lg={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginY: 4 }}>
      <Typography
        variant="body1"
        color={blueText}
      >
        Cộng đồng
      </Typography>
      <Iconify icon="formkit:arrowright" color={blueText} marginLeft={1} />
    </Grid>
  </Grid>
)


const BlogItem = ({ blueText }: { blueText: string }) => (
  <Card sx={{ maxWidth: 380, maxHeight: 300, padding: 2 }}>
    {/* info */}
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt="user avatar" sx={{ width: 56, height: 56 }} src="https://cdn.dribbble.com/users/2199928/screenshots/11532918/media/5a7273b592ea860e6d0ff2931ecab4f3.png?resize=400x300&vertical=center" />
        <Box sx={{ marginLeft: 2 }}>
          <Typography
            variant="h4"
          >
            SonHo
          </Typography>
        </Box>
      </Box>
      <Link href='#blog' underline='none'>
        <Typography
          variant="body2"
          color={blueText}
          sx={{ paddingLeft: 1 }}
        >
          Đi xem
        </Typography>
      </Link>
    </Box>
    {/* blog content */}
    <Box sx={{ height: 95, width: '100%', overflow: 'hidden', marginY: 3 }}>
      Bạn bè của tôi. Giao dịch là công việc ở xa. Rủi ro càng lớn thì giao dịch càng giống như một sòng bạc.
      Đó là lý do tại sao rủi ro của tôi là 1, đây là rủi ro tối thiểu. Tôi rất vui vì h...
    </Box>
    {/* like & comment */}
    <Box display='flex' alignItems='center'>
      <Iconify icon="grommet-icons:like" width={15} height={15} />
      <Typography variant="caption" marginX={1}>
        7
      </Typography>
      <Iconify icon="icon-park-outline:comment" width={15} height={15} marginLeft={2} />
      <Typography variant="caption" marginX={1}>
        Bình luận
      </Typography>
    </Box>
  </Card>
)
