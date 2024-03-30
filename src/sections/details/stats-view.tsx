// @mui
import { useTheme } from '@mui/material/styles';
import { Divider, Tab, Tabs, Typography, tabsClasses } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

// components
import { useSettingsContext } from 'src/components/settings';
import ChartArea from './data-chart-area';
import ChartColumn from './data-chart-column';
import ChartCat from './data-chart-cat';
import { useCallback, useState } from 'react';
import DataOverview from './data-overview';
import TradingDataCopiers from './trading-data-copiers';
import TradingDataRecord from './trading-data-records';
import TradingDataCurrent from './trading-data-curent';
import TradingDataHistory from './trading-data-history';
import ChartColumnNegative from './data-chart-column-negative';
//data
import { _Pnl30, _Pnl7 } from './fake-data/chart-area';
import { _PnlVoL180, _PnlVoL30, _PnlVoL7, _PnlVoL90 } from './fake-data/chart-column-negative';
import { _PnlRisk180, _PnlRisk30, _PnlRisk7, _PnlRisk90 } from './fake-data/chart-column';
import { _PnlPre180, _PnlPre30, _PnlPre7, _PnlPre90 } from './fake-data/chart-cat';
import { Stack } from '@mui/system';



// ----------------------------------------------------------------------
const TABS = [
  {
    value: 'data',
    label: 'Số liệu giao dịch ',
  },
  {
    value: 'positions',
    label: 'Vị thế giữ hiện tại',
  },
  {
    value: 'history',
    label: 'Lịch sử giao dịch',
  },
  {
    value: 'records',
    label: 'Ghi chép chuyển khoản',
  },
  {
    value: 'copiers',
    label: 'Người sao chép',
  },

];

const DATA_AREA = [
  {
    id:0,
    date: '7 ngày qua',
    time: _Pnl7.map((date) => {return date.pnlDate }),
    data: [
      {
        value: 'ROI',
        name: 'Tỷ suất lợi tức',
        data: _Pnl7.map((date) => {return date.cumulativePnlAmount }),
      },
      {
        value: 'PnL',
        name: 'Lũy kế lãi lỗ',
        data: _Pnl7.map((date) => {return date.cumulativePnlRate }),
      },
      {
        value: 'Account',
        name: 'Tài sản tài khoản',
        data: _Pnl7.map((date) => {return date.assetAmount }),
      },

    ],
  },
  {
    id:1,
    date: '30 ngày qua',
    time: _Pnl30.map((date) => {return date.pnlDate }),
    data: [
      {
        value: 'ROI',
        name: 'Tỷ suất lợi tức',
        data: _Pnl30.map((date) => {return date.cumulativePnlAmount }),
      },
      {
        value: 'PnL',
        name: 'Lũy kế lãi lỗ',
        data: _Pnl30.map((date) => {return date.cumulativePnlRate }),
      },
      {
        value: 'Account',
        name: 'Tài sản tài khoản',
        data: _Pnl30.map((date) => {return date.assetAmount }),
      },

    ],
  },
  {
    id:2,
    date: '90 ngày qua',
    time: _Pnl7.map((date) => {return date.pnlDate }),
    data: [
      {
        value: 'ROI',
        name: 'Tỷ suất lợi tức',
        data: _Pnl7.map((date) => {return date.cumulativePnlAmount }),
      },
      {
        value: 'PnL',
        name: 'Lũy kế lãi lỗ',
        data: _Pnl7.map((date) => {return date.cumulativePnlRate }),
      },
      {
        value: 'Account',
        name: 'Tài sản tài khoản',
        data: _Pnl7.map((date) => {return date.assetAmount }),
      },

    ],
  },
  {
    id:3,
    date: '180 ngày qua',
    time: _Pnl30.map((date) => {return date.pnlDate }),
    data: [
      {
        value: 'ROI',
        name: 'Tỷ suất lợi tức',
        data: _Pnl30.map((date) => {return date.cumulativePnlAmount }),
      },
      {
        value: 'PnL',
        name: 'Lũy kế lãi lỗ',
        data: _Pnl30.map((date) => {return date.cumulativePnlRate }),
      },
      {
        value: 'Account',
        name: 'Tài sản tài khoản',
        data: _Pnl30.map((date) => {return date.assetAmount }),
      },

    ],
  },
]

const DATA_NEGA = [
  {
    id:0,
    type: '7 ngày qua',
    time: _PnlVoL7.map((date) => {return date.pnlDate }),
    data:
      [{
        name: 'Thu',
        data: _PnlVoL7.map((date) => {return date.weeklyPnl }),
      },]
  },
  {
    id:1,
    type: '30 ngày qua',
    time: _PnlVoL30.map((date) => {return date.pnlDate }),
    data:
      [{
        name: 'Thu',
        data: _PnlVoL30.map((date) => {return date.weeklyPnl }),
      },]
  },
  {
    id:2,
    type: '90 ngày qua',
    time: _PnlVoL90.map((date) => {return date.pnlDate }),
    data:
      [{
        name: 'Thu',
        data:  _PnlVoL90.map((date) => {return date.weeklyPnl }),
      },]


  },
  {
    id:3,
    type: '180 ngày qua',
    time: _PnlVoL180.map((date) => {return date.pnlDate }),
    data:
      [{
        name: 'Thu',
        data:  _PnlVoL180.map((date) => {return date.weeklyPnl }),
      },]


  },

]

const DATA_PIE=[
  {
    id:0,
    type: '7 ngày qua',
    data:_PnlPre7
  },
  {
    id:1,
    type: '30 ngày qua',
    data:_PnlPre30
  },
  {
    id:2,
    type: '90 ngày qua',
    data:_PnlPre90
  },
  {
    id:3,
    type: '180 ngày qua',
    data:_PnlPre180
  },

]

const DATA_COL=[
  {
    id:0,
    total:_PnlRisk7.maxLoss,
    type: '7 ngày qua',
    time: _PnlRisk7.riskInfoVoList.map((date) => {return date.pnlDate }),
    data:
      [{
        name: 'Thu',
        data: _PnlRisk7.riskInfoVoList.map((date) => {return date.riskLevel }),
      },]
  },
  {
    id:1,
    total:_PnlRisk30.maxLoss,
    type: '30 ngày qua',
    time: _PnlRisk30.riskInfoVoList.map((date) => {return date.pnlDate }),
    data:
      [{
        name: 'Thu',
        data: _PnlRisk30.riskInfoVoList.map((date) => {return date.riskLevel }),

      },]
  },
  {
    id:2,
    total:_PnlRisk90.maxLoss,
    type: '90 ngày qua',
    time: _PnlRisk90.riskInfoVoList.map((date) => {return date.pnlDate }),
    data:
      [{
        name: 'Thu',
        data: _PnlRisk90.riskInfoVoList.map((date) => {return date.riskLevel }),

      },]
  },
  {
    id:3,
    total:_PnlRisk180.maxLoss,
    type: '180 ngày qua',
    time: _PnlRisk180.riskInfoVoList.map((date) => {return date.pnlDate }),
    data:
      [{
        name: 'Thu',
        data: _PnlRisk180.riskInfoVoList.map((date) => {return date.riskLevel }),

      },]
    }

]

// ----------------------------------------------------------------------

export default function StatsView() {

  const theme = useTheme();

  const settings = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('data');
  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);


  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              width: 1,
              mt: 4,
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

      <Divider sx={{mb:2}}/>

      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='caption'>Dữ liệu cập nhật: {new Date().toLocaleDateString()} (15 phút/lần)</Typography>
        <Typography variant='caption'>Lợi nhuận chia: 15% (quyết toán hàng tuần)</Typography>
      </Stack>

      {currentTab === 'data' &&<Grid container spacing={3}>
            <Grid  md={4} xs={12}>
              <DataOverview/>
            </Grid>

            <Grid container spacing={3} md={8}>
                <Grid xs={12} md={12} lg={12}>
                  <ChartArea
                    chart={{
                      series: DATA_AREA,
                    }}
                  />

                </Grid>

                <Grid xs={12} lg={6}>
                <ChartColumnNegative
                    title="Thu nhập hàng tuần"
                    chart={{
                      series: DATA_NEGA
                    }}
                  />
                </Grid>

                <Grid xs={12} lg={6}>
                <ChartColumn
                    title="Đánh giá rủi ro"
                    chart={{
                      series: DATA_COL,
                    }}
                  />
                </Grid>

                <Grid xs={12} lg={12}>
                  <ChartCat
                      title="GD nhiều nhất"
                      chart={{
                        series: DATA_PIE,
                        colors: [
                          theme.palette.primary.main,
                          theme.palette.warning.dark,
                          theme.palette.success.darker,
                          theme.palette.error.main,
                          theme.palette.info.dark,
                        ],
                      }}
                    />
                </Grid>
              </Grid>
      </Grid>}

      {currentTab === 'positions' && <TradingDataCurrent/>}

      {currentTab === 'history' && <TradingDataHistory/>}

      {currentTab === 'records' && <TradingDataRecord/>}

      {currentTab === 'copiers' && <TradingDataCopiers/>}
    </Container>
  );
}
