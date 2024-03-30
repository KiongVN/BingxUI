import { ApexOptions } from 'apexcharts';
import { useState, useCallback } from 'react';
// @mui
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
// components
import Iconify from 'src/components/iconify';
import Chart, { useChart } from 'src/components/chart';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/system';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    series: {
      id:number;
      type: string;
      time:string[];
      data: {
        name: string;
        data: number[];
      }[];
    }[];
    options?: ApexOptions;
  };
}

export default function ChartColumnNegative({ title, subheader, chart, ...other }: Props) {
  const { series, options } = chart;

  const popover = usePopover();

  const [seriesData, setSeriesData] = useState('90 ngày qua');
  const [Id, setId] = useState(2);

  const theme = useTheme();

  const chartOptions = useChart({
    stroke: { show: false },
    yaxis: {
      labels: {
        formatter: (value: number) => `${value.toFixed(0)}`,
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
      y: {
        formatter: (value: number) => `${value} USDT`,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        colors: {
          ranges: [
            { from: 0, to: 30000, color: theme.palette.primary.main },
            { from: -30000, to: 0, color: theme.palette.error.main },
          ],
        },
      },
    },
    ...options,
  });


  const handleChangeSeries = useCallback(
    (newValue: string, newId: number) => {
      popover.onClose();
      setSeriesData(newValue);
      setId(newId)
    },
    [popover]
  );

  return (
    <>
      <Card {...other}>
        <CardHeader
          title={title}
          subheader={subheader}
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
          <Box key={item.type} sx={{ mt: 3, mx: 3 }}>
            {item.type === seriesData && (
              <Chart dir="ltr" type="bar" series={item.data} options={chartOptions} height={364} />
            )}
          </Box>
        ))}
      <Stack direction='row' spacing={3} justifyContent='center' sx={{mb: 8}}>
        <Stack direction='row' spacing={3} sx={{}}>
          <Box component='div' sx={{backgroundColor: theme.palette.primary.main ,borderRadius: "3px", width: '16px', height: '16px'}}></Box>
          Lãi
        </Stack>
        <Stack direction='row' spacing={3}>
          <Box component='div' sx={{backgroundColor: theme.palette.error.main ,borderRadius: "3px", width: '16px', height: '16px'}}></Box>
          Lỗ
        </Stack>
      </Stack>
      </Card>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 140 }}>
        {series.map((option) => (
          <MenuItem
            key={option.id}
            selected={option.type === seriesData}
            onClick={() => handleChangeSeries(option.type,option.id)}
          >
            {option.type}
          </MenuItem>
        ))}
      </CustomPopover>


    </>
  );
}
