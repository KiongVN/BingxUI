import { useScroll } from 'framer-motion';
import { useState } from 'react';
// @mui
import { Tab, Tabs, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// components
import Iconify from 'src/components/iconify';
import ScrollProgress from 'src/components/scroll-progress';
import { RouterLink } from 'src/routes/components';
import { useSettingsContext } from 'src/components/settings';
import CopyTradingHeader from './sections/header';
import { AllTellersSection, TellersSection } from './sections/tellersSection';
import { TellersBlogSection } from './sections/tellerBlogSection';
import { fakeData } from '../fake-data';
import FAQsSection from './sections/faqsSection';

// ----------------------------------------------------------------------
const blueText = "#0047FF"
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const data = fakeData

export default function CopyTradingView() {
  const { scrollYProgress } = useScroll();
  const settings = useSettingsContext();

  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ marginTop: 10 }}>
        {/* Header */}
        <CopyTradingHeader textBlue={blueText} />

        {/* Sections */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Giao dịch viên Hợp đồng" {...a11yProps(0)} />
              <Tab label="Giao dịch viên Spot" {...a11yProps(1)} />
            </Tabs>
            <Box>
              <Button component={RouterLink} href="#" variant="text">
                <Iconify icon="ri:search-line" />
              </Button>
              <Button component={RouterLink} href="#" variant="outlined">
                <Iconify icon="solar:card-transfer-bold-duotone" sx={{ marginRight: 1 }} />
                Giao dịch của tôi
              </Button>
              <Button component={RouterLink} href="#" variant="outlined" sx={{ marginX: 1 }}>
                <Iconify icon="ph:planet-bold" sx={{ marginRight: 1 }} />
                Đăng ký của tôi
              </Button>
              <Button component={RouterLink} href="#" variant="outlined">
                <Iconify icon="material-symbols:menu" />
              </Button>
            </Box>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <TellersSection title="Giao dịch viên hot" subTitle="Các giao dịch viên hot 7 ngày qua" blueText={blueText} data={data} />
            <TellersSection title="Giao dịch viên bền vững" subTitle="Rủi ro thấp, giá trị tăng lâu dài" blueText={blueText} data={data} />
            <TellersSection title="Ngôi sao mới nổi" subTitle="Đây là các giao dịch viên mới đầy tiềm năng." blueText={blueText} data={data} />
            {/* all tellers */}
            <AllTellersSection title='Toàn bộ giao dịch viên' blueText={blueText} showFilter data={data} />
            {/* Blog */}
            <TellersBlogSection title='Giao dịch viên cho biết...' blueText={blueText} sx={{ marginY: 10 }} />
            {/* FAQs */}
            <FAQsSection blueText={blueText}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <AllTellersSection title='Toàn bộ giao dịch viên' blueText={blueText} showFilter={false} data={data} />
          </CustomTabPanel>
        </Box>
      </Container>
    </>
  );
}
