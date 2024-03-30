import { ApexOptions } from 'apexcharts';
import { useState, useCallback } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import ButtonBase from '@mui/material/ButtonBase';
import Card, { CardProps } from '@mui/material/Card';
// components
import Iconify from 'src/components/iconify';
import Chart, { useChart } from 'src/components/chart';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { Grid, Tab, Tabs, tabsClasses } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  chart: {
    categories?: string[][];
    colors?: string[][];
    series: {
      id:number;
      time:string[];
      date: string;
      data: {
        value: string;
        name: string;
        data: number[];
      }[];
    }[];
    options?: ApexOptions;
  };
}

export default function ChartArea({ chart, ...other }: Props) {
  const theme = useTheme();

  const [currentdata, setCurrentdata] = useState('ROI');
  const handleChangedata = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentdata(newValue);
  }, []);

  const {
    colors = [
      [theme.palette.primary.light, theme.palette.primary.main],
      [theme.palette.warning.light, theme.palette.warning.main],
    ],
    series,
    options,
  } = chart;

  const popover = usePopover();


  const [seriesData, setSeriesData] = useState('30 ngày qua');
  const [Id, setId] = useState(1);



  const chartOptions = useChart({
    colors: colors.map((colr) => colr[1]),
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: colors.map((colr) => [
          { offset: 0, color: colr[0] },
          { offset: 100, color: colr[1] },
        ]),
      },
    },
    xaxis: {
      type: "datetime",
      categories: chart.series[Id].time,
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },

  });

  const handleChangeSeries = useCallback(
    (newValue: string, newid: number) => {
      popover.onClose();
      setSeriesData(newValue);
      setId(newid)
    },
    [popover]
  );

  return (
    <>
      <Card {...other}>
        <CardHeader
          title={currentdata}
          action={
            <ButtonBase
              onClick={popover.onOpen}
              sx={{
                pl: 1,
                py: 0.5,
                pr: 0.5,
                borderRadius: 1,
                typography: 'subtitle2',
                bgcolor: 'background.neutral',
              }}
            >
              {seriesData}

              <Iconify
                width={16}
                icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
                sx={{ ml: 0.5 }}
              />
            </ButtonBase>
          }
        />

        {series.map((item) => (
          <Box key={item.date} sx={{ mt: 3, mx: 3 }}>
            {item.date === seriesData && (
              <Chart dir="ltr" type="line" series={item.data.filter((a) =>{return a.value===currentdata})} options={chartOptions} height={364} />
            )}


          </Box>

        ))}
         <Tabs
                  value={currentdata}
                  onChange={handleChangedata}
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
                  {chart.series[Id].data.map((tab) => (
                    <Tab key={tab.value} value={tab.value}  label={tab.name} />
                  ))}
          </Tabs >

      </Card>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 140 }}>
        {series.map((option) => (
          <MenuItem
            key={option.date}
            selected={option.date === seriesData}
            onClick={() => handleChangeSeries(option.date,option.id)}
          >
            {option.date}
          </MenuItem>

        ))}
      </CustomPopover>
    </>
  );
}
