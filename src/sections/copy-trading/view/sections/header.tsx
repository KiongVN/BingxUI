import { useScroll } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// components
import ScrollProgress from 'src/components/scroll-progress';
import Image from 'src/components/image';
import { Link, Typography } from '@mui/material';


import Iconify from 'src/components/iconify';
import headerPic from "../../../../../public/assets/header-copy-trade.webp"

// ----------------------------------------------------------------------

export default function CopyTradingHeader({ textBlue }: { textBlue: string }) {
  return (
    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Typography
          variant="h2"
        >
          Sao chép giao dịch viên ưu tú toàn cầu
        </Typography>
        <Typography
          sx={{ fontSize: 28 }}
        >
          Đã tạo dựng <span style={{ color: textBlue, fontWeight: 800 }}>7,170,1730</span> mối quan hệ sao chép
        </Typography>
        <Link href='#Regis' underline='none' sx={{ display: 'flex', alignItems: 'center', paddingY: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: 4 }}>
            <Typography
              variant="subtitle1"
              color={textBlue}
              sx={{ paddingRight: 1 }}
            >
              Đăng ký làm giao dịch viên
            </Typography>
            <Iconify icon="formkit:arrowright" color={textBlue} />
          </Box>
          <Link href='#guide' underline='none' sx={{ display: 'flex', alignItems: 'center', paddingX: 4, borderLeft: 1 }}>
            <Iconify icon="material-symbols:developer-guide-outline-rounded" color={textBlue} />
            <Typography
              variant="subtitle1"
              color={textBlue}
              sx={{ paddingLeft: 1 }}
            >
              Hướng dẫn giao dịch sao chép
            </Typography>
          </Link>
        </Link>
      </Box>
      <Box>
        <Image src={headerPic} alt='copy-trade' width={400} height={200} borderRadius={2} />
      </Box>
    </Box >
  )
}


