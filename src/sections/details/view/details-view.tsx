
import { useScroll } from 'framer-motion';
// @mui
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { Box, Button, Divider } from '@mui/material';
import { Stack } from '@mui/system';
// components
import ScrollProgress from 'src/components/scroll-progress';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import Image from 'src/components/image';
//paths

//react hook
import { useCallback, useState } from 'react';
import { RouterLink } from 'src/routes/components';

//data
import { _profile } from '../fake-data/profile-trader';

//section
import InsightView from '../insight-view';
import StatsView from '../stats-view';
import ProfileTrader from '../profile-trader-view';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'stats',
    label: 'Số liệu thống kê ',
  },
  {
    value: 'insight',
    label: 'Quan điểm',
  },

];



const POST=[
  {
  id: '01',
  media: 'https://static-app.bb-os.com/social_feed_pictures/20231121/48e9e9c36908c64ad8307d9ba6a91f70.jpg?x-oss-process=image/resize,w_400,m_lfit',
  message: 'Gần đây, số lượng người theo dõi dần dần tăng lên và tôi cũng phát hiện ra rằng một số người đã đặt cọc nhiều hơn, nhiều người cũng hỏi tôi liệu tôi có khuyên bạn nên tăng số lượng đơn hàng theo dõi hay không. Như người xưa vẫn nói, lợi nhuận càng cao Rủi ro càng cao thì phần thưởng phải theo sau rủi ro, đừng bị tôi lừa.Bối rối trước đường cong lợi suất, tôi dám sử dụng đòn bẩy cao hơn, nghĩa là đây là rủi ro tôi có thể chịu được, đồng thời cũng rất vui khi được kiếm tiền từ từ.',
  createdAt: new Date,
  personLikes:[{
    name: 'a',
    avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg'
  },{
    name: 'b',
    avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg'
  }
],
comments:[
  {
    id: '01',
    message: 'Lara Keller qua FaCëBøk là giao dịch tốt nhất, tôi đã kiếm được €5000 trên nền tảng của họ cũng là giao dịch tốt nhất trong việc thu hồi tiền, tài sản và lợi nhuận bị mất',
    createdAt: new Date,
    author: {
      id: '01',
      name: 'Kiong',
      avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg'
  }
    },
    {
      id: '02',
      message: 'Xin chào các bạn, Tôi Sao chép với các bạn Từ hôm qua, đến nay tôi đã lỗ hơn 15% ,, Nhưng không vấn đề gì, tôi tin tưởng và biết rằng chúng ta sẽ bù đắp trong những ngày tới ☆☆☆☆☆ đi ☆ đi ☆ đi',
      createdAt: new Date,
      author: {
        id: '01',
        name: 'Navi',
        avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg'
    }
      }

]
},
{
  id: '02',
  media: 'https://static-app.bb-os.com/social_feed_pictures/20231116/f65bfb4109ee761c8fd227e7b3865321.jpg?x-oss-process=image/resize,w_400,m_lfit',
  message: 'Bán khống không phải là điểm mạnh của tôi, nhưng theo chiến lược của tôi, đó là cơ hội tốt để mở một vị thế bán khống cách đây vài ngày, mặc dù WLD không nắm bắt được lợi nhuận nhưng nhìn chung nó vẫn kiếm được rất nhiều tiền. Điều này có thể không xảy ra. đáy, nhưng nó sẽ ở trong vài ngày tới. Khi mở một vị trí theo hướng mà tôi giỏi, tôi nên tập trung vào việc bảo vệ lợi nhuận trước tiên. Suy cho cùng, tôi không chiến đấu một mình và phải có trách nhiệm với bản thân và người khác những người tuân theo mệnh lệnh vì sự tin tưởng vào tôi.',
  createdAt: new Date,
  personLikes:[{
    name: 'a',
    avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg'
  },{
    name: 'b',
    avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg'
  }
],
comments:[
  {
    id: '022',
    message: 'Lara Keller qua FaCëBøk là giao dịch tốt nhất, tôi đã kiếm được €5000 trên nền tảng của họ cũng là giao dịch tốt nhất trong việc thu hồi tiền, tài sản và lợi nhuận bị mất',
    createdAt: new Date,
    author: {
      id: '01',
      name: 'Kiong',
      avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg'
  }
    },
    {
      id: '02',
      message: 'Xin chào các bạn, Tôi Sao chép với các bạn Từ hôm qua, đến nay tôi đã lỗ hơn 15% ,, Nhưng không vấn đề gì, tôi tin tưởng và biết rằng chúng ta sẽ bù đắp trong những ngày tới ☆☆☆☆☆ đi ☆ đi ☆ đi',
      createdAt: new Date,
      author: {
        id: '01',
        name: 'Navi',
        avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg'
    }
      }

]
}
]

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function DetailsView( { id }: Props ) {
  const { scrollYProgress } = useScroll();

  const settings = useSettingsContext();

   const result = _profile.find((user) => {return user.uid === id})

   const trander = result !== undefined ? result :  _profile[1];

  console.log(trander, typeof trander)
  const [currentTab, setCurrentTab] = useState('stats');
  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  // Chane Acc
  const [currentAcc, setCurrentAcc] = useState('futures');
  const handleChangeAcc = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentAcc(newValue);
  }, []);

  return (
   <>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Button
          component={RouterLink}
          href='/'
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Chi tiết về giao dịch viên
        </Button>

        <ProfileTrader
            about={trander.traderInfo.brief}
            name={trander?.traderInfo.nickName}
            avatarUrl={trander?.traderInfo.avatar}
            live={trander?.traderInfo.registerIpCountry}
            followers={trander?.fansNum}
            dateJoin={new Date(trander?.traderInfo.registerDate)}
            icon={trander?.traderInfo.icon}
        />

        <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              bgcolor: 'background.paper',
              [`& .${tabsClasses.flexContainer}`]: {
                pr: { md: 3 },
                justifyContent:'space-around'
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value}  label={tab.label} />
            ))}
        </Tabs >

        <Divider sx={{mb:5}}/>


        {currentTab === 'stats' &&<Stack direction='row' spacing={3} justifyContent='flex-start' alignItems='center'>
              <Box sx={{typography: 'h5'}} >
              Tài khoản giao dịch sao chép:
              </Box>
              {/* Chane Acc */}
              {trander.traderSharingAccounts.map((tab) => (
                <Button key={tab.category} value={tab.displayName} color="inherit" sx={{typography: 'body2'}} >
                  <Box sx={{ p: 1 }}>
                    <Image alt={trander.traderInfo.nickName} src={tab.icon}  sx={{ borderRadius: 1.5, width: 20}} />
                  </Box>
                  {tab.displayName}
                </Button>
              ))}
        </Stack>}

        {currentTab === 'stats' && <StatsView />}

        {currentTab === 'insight' && POST.map((POST) => <InsightView key={POST.id} post={POST}/>)}

      </Container>
   </>

  );
}
