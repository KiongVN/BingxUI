import { useState } from 'react';
// @mui
import { Grid, Link, Pagination, Typography, SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// components
import Iconify from 'src/components/iconify';
import { TellerItem } from './tellerItem';
import ModalFilter from './modalFIlter';

interface sectionProps {
  title: string,
  subTitle: string,
  blueText: string,
  data: any[],
  sx?: SxProps<Theme>
}
interface sectionAllTellersProps {
  title: string,
  blueText: string,
  showFilter: boolean,
  data: any[]
}

const buttonFilter = [
  {
    id: 1,
    name: 'Sắp xếp'
  },
  {
    id: 2,
    name: 'Cấp độ tài khoản'
  },
  {
    id: 3,
    name: 'Tài sản tài khoản'
  },
  {
    id: 4,
    name: 'Số người sao chép'
  },
  {
    id: 5,
    name: 'ROI 30 ngày'
  },
  {
    id: 6,
    name: 'Lũy cái lãi lỗ'
  },
  {
    id: 7,
    name: 'Lũy kế nhận người sao chép'
  },
  {
    id: 8,
    name: 'Người theo dõi'
  },
  {
    id: 9,
    name: 'Đánh giá rủi ro'
  },
]

export const TellersSection = ({ title, subTitle, blueText, data, sx }: sectionProps) => (
  <Grid container spacing={2} marginBottom={4} sx={sx}>
    <Grid xs={12} md={12} lg={12} marginY={2}>
      <Typography variant="h3" >
        {title}
      </Typography>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant="body1" >
          {subTitle}
        </Typography>
        <Link href='#all' underline='none' color={blueText} display='flex' alignItems='center'>
          <Typography variant="body2" >
            Xem toàn bộ
          </Typography>
          <Iconify icon="iconamoon:arrow-right-2-light" />
        </Link>
      </Box>
    </Grid>
    {data.map((item, index) => (
      index < 3 && (
        <Grid item xs={12} md={6} lg={4} key={index}>
          <TellerItem blueText={blueText} userData={item.trader} />
        </Grid>
      )
    ))}
  </Grid>
)

export const AllTellersSection = ({ title, blueText, showFilter, data }: sectionAllTellersProps) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} md={12} lg={12} marginY={3}>
          <Typography variant="h3" marginBottom={2}>
            {title}
          </Typography>
          {/* button filter */}
          {showFilter && <Box sx={{ maxWidth: 'inherit', overflowX: 'scroll', whiteSpace: 'nowrap', paddingBottom: 2 }}>
            <Button variant='soft' sx={{ marginRight: 1 }} onClick={() => handleOpen()}>
              <Iconify icon="lets-icons:filter-big" marginRight={0.5} />
              Chọc lọc
            </Button>
            {buttonFilter.map((item, index) => (
              <Button variant='soft' key={index} sx={{ marginRight: 1 }}>{item.name}</Button>
            ))}
          </Box>}
        </Grid>
        {data.map((item, index) => (
          index < 3 && (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <TellerItem blueText={blueText} userData={item.trader} />
            </Grid>
          )
        ))}
      </Grid >
      <Grid container spacing={2} marginY={2}>
        {data.map((item, index) => (
          index < 3 && (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <TellerItem blueText={blueText} userData={item.trader} />
            </Grid>
          )
        ))}
      </Grid >
      {/* if hide filter then display 1 more grid */}
      {!showFilter && <Grid container spacing={4} marginY={4}>
        {data.map((item, index) => (
          index < 3 && (
            <Grid xs={12} md={6} lg={4} key={index}>
              <TellerItem blueText={blueText} userData={item.trader} />
            </Grid>
          )
        ))}
      </Grid >}
      <Box display='flex' justifyContent='center'>
        <Pagination count={10} color='info' />
      </Box>
      {/* Modal filter */}
      <ModalFilter open={open} handleClose={handleClose} />
    </>
  )
}
