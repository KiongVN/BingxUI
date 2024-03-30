import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

const trander = [{
  name:'traderName',
  avatarUrl:'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
  email:'ka***v@gmail.com',
  total:'+17.690.96'
},
{
  name:'traderName',
  avatarUrl:'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_24.jpg',
  email:'as***g@gmail.com',
  total:'+85.690.96'
},
{
  name:'traderName',
  avatarUrl:'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_19.jpg',
  email:'******176',
  total:'+53,690.96'
},
{
  name:'traderName',
  avatarUrl:'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_10.jpg',
  email:'******127',
  total:'+20,690.96'
},
{
  name:'traderName',
  avatarUrl:'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_11.jpg',
  email:'as***g@gmail.com',
  total:'+85.690.96'
},
{
  name:'traderName',
  avatarUrl:'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_15.jpg',
  email:'******176',
  total:'+53,690.96'
},
{
  name:'traderName',
  avatarUrl:'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_16.jpg',
  email:'******127',
  total:'+20,690.96'
},
]

export default function TradingDataCopiers() {
  const theme = useTheme();
  return (
  <>
  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
  *Biến đổi số người sao chép 7 ngày qua: +1782(+71.19%)
  </Typography>
  <Stack>
  {trander.map((trander) =>(

    <Box key={trander.avatarUrl}>
      <Stack direction='row' justifyContent="space-between" alignItems='center' sx={{my: 5}}>
        <Stack direction='row' justifyContent="flex-start" alignItems='end' spacing={2}>
        <Avatar
              src={trander.avatarUrl}
              alt={trander.name}
              sx={{
                mx: 'auto',
                width: { xs: 24, md: 64 },
                height: { xs: 24, md: 64 },
                border: `solid 2px ${theme.palette.common.white}`,
              }}
            />
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {trander.email}
          </Typography>
        </Stack>
        <Stack direction='column' justifyContent="center" alignItems='start' spacing={2}>
          <Typography variant="h5" sx={{color:'primary.main'}}>
              {trander.total}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Tổng thu nhập(USDT)
          </Typography>
        </Stack>
      </Stack>
      <Divider/>
    </Box>


  ))}
  </Stack>
  </>
  )
}
