import { ApexOptions } from 'apexcharts';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import { ButtonBase, MenuItem, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Chart, { useChart } from 'src/components/chart';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
//hook
import { useCallback, useState } from 'react';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    colors: string[];
    series: {
      id: number;
      type: string;
      data: {
          symbol: string;
          percentage: string;
          pnl: string;
          count: number;
          order: number;
      }[];
  }[]
    options?: ApexOptions;
  };
}


export default function ChartCat({ title, subheader, chart, ...other }: Props) {
  const theme = useTheme();

  const smUp = useResponsive('up', 'sm');

  const popover = usePopover();

  const [seriesData, setSeriesData] = useState('7 ngày qua');
  const [Id, setId] = useState(0);

  const { colors, series, options } = chart;

  const chartSeries = series[Id].data.map((i) => i.count);

  const chartOptions = useChart({
    colors,
    labels: series[Id].data.map((i) => i.symbol),
    stroke: {
      colors: [theme.palette.background.paper],
    },
    fill: {
      opacity: 0.9,
    },
    legend: {
      show: false,
      position: 'bottom',
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
    },
    tooltip: {
      fillSeriesColor: false,
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },},
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          legend: {
            position: 'bottom',
            horizontalAlign: 'left',
          },
        },
      },
    ],
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

        <Stack direction='row' justifyContent="center">
          <Box
            sx={{
              my: 5,
              '& .apexcharts-legend': {
                m: '0',
                height: { sm: 160 },
                flexWrap: { sm: 'wrap' },
                width: '50%',
              },
              '& .apexcharts-datalabels-group': {
                display: 'none',
              },
            }}
          >
            <Chart
              dir="ltr"
              type="pie"
              series={chartSeries}
              options={chartOptions}
            />
          </Box>
          <Box>
          <Table stickyHeader >
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      colSpan={1}
                      sx={{
                        background: (theme) => theme.palette.background.paper,
                      }}
                    >
                      Cặp GD
                    </TableCell>
                    <TableCell
                      align="left"
                      colSpan={1}
                      sx={{ background: (theme) => theme.palette.background.paper }}
                    >
                      Chiếm Tỷ lệ
                    </TableCell>
                    <TableCell
                      align="left"
                      colSpan={1}
                      sx={{ background: (theme) => theme.palette.background.paper }}
                    >
                      Lãi lỗ
                    </TableCell>
                  </TableRow>

                </TableHead>

                <TableBody>

                       {series[Id].data.map((row) => (
                          <TableRow hover key={row.order}>
                            <TableCell>
                              <Stack direction="row" spacing={3}>
                                <Box component="div" sx={{ color: chart.colors[row.order] , typography:"h6"}} >{row.symbol}</Box>
                              </Stack>
                            </TableCell>
                            <TableCell align="left" sx={{}}>
                              <Stack direction="column" >
                                <Box component="div" sx={{ color:parseInt(row.pnl, 10) > 0 ? "primary.main" : "error.main"}} >{row.percentage}</Box>
                                <Box component="div" sx={{ typography:"body2"}} >({row.count} lần )</Box>
                              </Stack>

                            </TableCell>
                            <TableCell align="left" sx={{ color:parseInt(row.pnl, 10) > 0 ? "primary.main" : "error.main" }}>
                              {row.pnl}
                            </TableCell>
                          </TableRow>
                        ))}


                </TableBody>
              </Table>
          </Box>
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
