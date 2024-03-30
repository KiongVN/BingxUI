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
import { Divider, Typography } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    categories?: string[];
    colors?: string[];
    series: {
      id:number;
      total:{
        maxLossDay: string;
        maxLossWeek: string;
        maxLossMonth: string;
    };
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

export default function ChartColumn({ title, subheader, chart, ...other }: Props) {
  const { colors, series, options } = chart;

  const popover = usePopover();

  const [seriesData, setSeriesData] = useState('90 ngày qua');
  const [Id, setId] = useState(2);

  const theme = useTheme();

  const chartOptions = useChart({
    colors,
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
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
        formatter: (value: number) => `rủi ro trung bình ${value}`,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        colors: {
          ranges: [
            { from: 0, to: 1, color: theme.palette.primary.main },
            { from: 2, to: 3, color: theme.palette.primary.light},
            { from: 4, to: 5, color: theme.palette.warning.light},
            { from: 6, to: 7, color: theme.palette.warning.main },
            { from: 8, to: 8, color: theme.palette.error.light},
            { from: 9, to: 9, color: theme.palette.error.main },

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
        <Stack spacing={1} sx={{m: '4px'}}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lỗ tối đa {seriesData}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              divider={<Divider orientation="vertical" flexItem  />}
            >
              <Stack>
              <Typography variant="h6" sx={{ }}>
               {chart.series[Id].total.maxLossDay}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                ngày
              </Typography>
              </Stack>
              <Stack>
              <Typography variant="h6" sx={{ }}>
              {chart.series[Id].total.maxLossWeek}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                tuần
              </Typography>
              </Stack>
              <Stack>
              <Typography variant="h6" sx={{ }}>
              {chart.series[Id].total.maxLossMonth}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              tháng
              </Typography>
              </Stack>
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
