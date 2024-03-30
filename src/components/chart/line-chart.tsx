import { ApexOptions } from 'apexcharts';
// @mui
import Box from '@mui/material/Box';
import { CardProps } from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
// components
import Chart, { useChart } from 'src/components/chart';

// ---------------------- Props -----------------------------------------
// chart={{
//   series: [
//     {
//       year: '2019',
//       data: [
//         {
//           name: 'Asia',
//           data: [10, 41],
//         },
//       ],
//     },
//   ],
// }}
// />
// ----------------------------------------------------------------------

interface Props extends CardProps {
  chart: {
    colors?: string[];
    series: {
      data: {
        name: string;
        data: number[];
      }[];
    }[];
    options?: ApexOptions;
  };
}

export default function LineChartCustomed({ chart, ...other }: Props) {
  const theme = useTheme();

  const {
    colors = [
      [theme.palette.primary.light, theme.palette.primary.main],
    ],
    series,
    options,
  } = chart;

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
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      labels: {
        show: false,
      }
    },
    ...options,
  });

  return (
    <Box {...other}>
      {series.map((item, index) => (
        <Box key={index} sx={{ width: '100%' }}>
          <Chart dir="ltr" type="line" series={item.data} options={chartOptions} height={95}/>
        </Box>
      ))}
    </Box>
  );
}
