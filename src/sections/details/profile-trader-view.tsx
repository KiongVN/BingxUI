// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
// theme
import { Button, IconButton } from '@mui/material';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';

// ----------------------------------------------------------------------
 type ITraderProfileCover = {
  id?: string;
  name: string;
  about: string;
  avatarUrl: string;
  followers: number;
  live:string;
  dateJoin: Date;
  icon:string
};

export default function ProfileTrader({ name, avatarUrl, about,followers,live,dateJoin,icon}: ITraderProfileCover) {
  const theme = useTheme();



  return (

     <Stack direction='row' justifyContent='space-between' alignItems='center' >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{
           p:5,
           width: "80%"
          }}
        >
          <Avatar
            src={avatarUrl}
            alt={name}
            sx={{
              mx: 'auto',
              width: { xs: 64, md: 128 },
              height: { xs: 64, md: 128 },
              border: `solid 2px ${theme.palette.common.white}`,
            }}
          />
         <Stack spacing={1}>
            <Stack
            direction="row" spacing={1} alignItems='center' justifyContent='flex-start'
            sx={{
              height: '100%',
            }}
            >
              <Stack direction='row' alignItems='center' justifyContent='flex-start'>
                <Box sx={{typography: 'h3'}} >{name}</Box>
                <Box sx={{ p: 1 }}>
                  <Image alt={name} src={icon}  sx={{ borderRadius: 1.5, width: 20}} />
                </Box>
              </Stack>
              <Button variant="contained" sx={{}}>Đăng ký +</Button>
              <IconButton color="inherit"><Iconify icon="ph:medal-fill" width={24} /></IconButton>
              <IconButton color="inherit"><Iconify icon="majesticons:share" width={24} /></IconButton>

            </Stack>

            <Stack
            direction="row" spacing={2} alignItems='center' justifyContent='flex-start'
            sx={{
              height: '100%',
            }}
            >
              <Box sx={{typography: 'body2', alignItems:"center"}} >
                <Iconify icon="mingcute:user-follow-2-fill" width={24} sx={{ mr:1 , width: 16, height:16, color:"secondary"}}/>
                {followers}
                {' '}Followers
              </Box>
              <Box sx={{typography: 'body2'}} >
                <Iconify icon="fluent:location-12-filled" width={24} sx={{ mr:1 , width: 16, height:16, color:"secondary"}}/>
                {live}
              </Box>
              <Box sx={{typography: 'body2'}} >
                <Iconify icon="solar:calendar-line-duotone" width={24} sx={{ mr:1 , width: 16, height:16, color:"secondary"}}/>
                {dateJoin.toLocaleDateString()}
                {' '}Joined
              </Box>

            </Stack>
            <Box>
            <Iconify icon="gg:loadbar-doc" width={24} sx={{ mr:1, width: 16, height:16, color:"secondary" }}/>
              {about}
            </Box>


         </Stack>

        </Stack>
        <Stack sx={{m:"auto"}}><Button variant='contained' sx={{backgroundColor:theme.palette.info.main}} >Sao chép</Button></Stack>
     </Stack>

  );
}
