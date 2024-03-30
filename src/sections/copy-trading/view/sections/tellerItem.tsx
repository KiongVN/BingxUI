// @mui
import { Avatar, Card, Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// components
import LineChartCustomed from 'src/components/chart/line-chart';
import Iconify from 'src/components/iconify';

const placeHolderAvt = 'https://cdn.dribbble.com/users/2199928/screenshots/11532918/media/5a7273b592ea860e6d0ff2931ecab4f3.png?resize=400x300&vertical=center'
interface UserData {
  uid: number,
  nickName: string,
  avatar: string,
  contract: string,
  valueLineChart: number[],
  last30DaysData: string,
  copyData: number,
  riskData: number
}

export const TellerItem = ({ blueText, userData }: { blueText: string, userData: UserData }) => {
  console.log(userData)
  return (
    <Card sx={{ maxWidth: 380, maxHeight: 300, padding: 2, width: '100%' }}>
      <Box component={Link} href={`/${userData.uid}`} underline='none' color='inherit'>
        {/* info */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt="user avatar" sx={{ width: 56, height: 56 }} src={userData.avatar || placeHolderAvt} />
            <Box sx={{ marginLeft: 1 }}>
              <Typography
                variant="h6"
              >
                {userData.nickName}
              </Typography>
              <Typography
                variant="body2"
              >
                <Iconify icon="ph:medal-fill" color='gold' />
                {userData.contract}
              </Typography>
            </Box>
          </Box>
          <Button variant='outlined' sx={{ backgroundColor: blueText, color: 'white', borderRadius: 8, px: 0.5, py: 0 }}>
            Sao chép
          </Button>
        </Box>
        {/* chart */}
        <Box>
          <LineChartCustomed
            chart={{
              series: [
                {
                  data: [
                    {
                      name: 'Tỷ Suất Lợi Tuất (%)',
                      data: userData.valueLineChart,
                    },
                  ],
                },
              ],
            }}
          />
        </Box>
        {/* some other data */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex' }}>
            <Box>
              <Typography variant="h6" textAlign="left" color='#66bb6a'>
                {userData.last30DaysData}
              </Typography>
              <Typography variant="caption">
                Tỷ suất 30 ngày qua
              </Typography>
            </Box>
            <Box paddingX={4} textAlign="center">
              <Typography variant="h6">
                {userData.copyData}
              </Typography>
              <Typography variant="caption">
                Người sao chép
              </Typography>
            </Box>
          </Box>
          <Box textAlign='right'>
            <Typography variant="h6" color="#ffb74d">
              {userData.riskData}
            </Typography>
            <Typography variant="caption">
              Rủi ro
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}
