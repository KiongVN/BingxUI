// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Box, ButtonBase, Divider, MenuItem } from '@mui/material';
//hook
import { useCallback, useState } from 'react';
//components
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import PopoverData from './data-popover';
//data
import { _overview } from './fake-data/overview';
// ----------------------------------------------------------------------

const overview=_overview;


//-----------------------------------------------------------------------

export default function DataOverview() {

  const popover = usePopover();

  const [seriesLabel, setSeriesLabel] = useState('7 ngày qua');
  const [seriesData, setSeriesData] = useState('+75.00%');
  const [seriesRisk, setSeriesRisk] = useState('4');

  const handleChangeSeries = useCallback(
    (Label: string,data:string,risk:string) => {
      popover.onClose();
      setSeriesLabel(Label);
      setSeriesData(data);
      setSeriesRisk(risk)
    },
    [popover]
  );


  return (
    <Card sx={{ p: 3}} >
      <Typography variant="h5" gutterBottom>
        Tổng quan dữ liệu
      </Typography>

      <Card sx={{ py: 3, textAlign: 'center', typography: 'h4', mb: 5 }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem  />}
        >
          <Stack width={1}>
          <PopoverData
            sub=' 1. Sử dụng lợi suất gia trọng thời gian (TWR)\n
                  2. Lấy ví dụ 30 ngày, lợi suất gia trọng thời gian 30 ngày = (1 + tỷ suất lợi tức tuần đầu) * (1 + tỷ suất lợi tức tuần 2)... * (1 + tỷ suất lợi tức tuần n) - 1. Tỷ suất lợi tức biến đổi theo lãi lỗ chưa thực hiện của các vị thế.\n
                  3. Dữ liệu cập nhật 15 phút/lần.'>
              <Typography variant="h5" sx={{color:'primary.main'}}>{seriesData}</Typography>
          </PopoverData>
            <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
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
                {seriesLabel}

                <Iconify
                  width={16}
                  icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
                  sx={{ ml: 0.5 }}
                />
              </ButtonBase>
              <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 140 }}>
          {overview.seriesRecent.map((option) => (
            <MenuItem
              key={option.label}
              selected={option.label === seriesLabel}
              onClick={() => handleChangeSeries(option.label, option.strRecent, option.riskLevel )}
            >
              {option.label}
            </MenuItem>
          ))}
        </CustomPopover>
            </Box>
          </Stack>

          <Stack width={1}>
          <PopoverData
          sub='Tổng lãi lỗ tài sản của tài khoản HĐ Binance USDT sau khi trừ phí tài trợ, lãi lỗ ròng sau hoa hồng. Dữ liệu cập nhật 30 phút/lần.'
          >
            <Typography variant="h5" sx={{color:'primary.main'}}>{overview.totalEarnings}</Typography>
            </PopoverData>
            <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
              Lũy kế thu nhập
            </Box>
          </Stack>
        </Stack>
      </Card>

      <Stack spacing={2}>

        <Stack direction="row" justifyContent="space-between">
          <PopoverData
          sub= "Tài sản của tài khoản HĐ Binance USDT. Dữ liệu cập nhật 15 phút/lần."
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Tài sản tài khoản
            </Typography>
          </PopoverData>
          <Typography variant="body2">{overview.equity}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <PopoverData
            sub='Lũy kế lợi nhuận của toàn bộ người dùng sao chép giao dịch viên này. Dữ liệu cập nhật 15 phút/lần.'
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Lợi nhuận người sao chép
            </Typography>
          </PopoverData>
          <Typography variant="body2" sx={{ color: 'primary.main' }}>{overview.followerEarning}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <PopoverData
            sub='Số người sao chép tài khoản giao dịch viên hiện tại (bao gồm cả tạm ngừng sao chép).'
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Số người sao chép
            </Typography>
          </PopoverData>
          <Typography variant="body2">{overview.strFollowerNum}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <PopoverData
            sub='Cấp độ rủi ro từ 1~9 được đánh giá theo tỷ lệ thua lỗ tối đa hàng ngày, trích nguồn và dựa trên các hoạt động giao dịch của giao dịch viên trong 30 ngày qua. Cấp độ càng cao, rủi ro càng lớn.'
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Đánh giá rủi ro
            </Typography>
          </PopoverData>
          <Typography variant="body2" sx={{backgroundColor: 'primary.main',color:'white',borderRadius: 2, width:24, height:24, textAlign:'center'}}>{seriesRisk}</Typography>
        </Stack>

        <Divider/>

        <Stack direction="row" justifyContent="space-between">
          <PopoverData
          sub='Tỷ lệ thắng = Số lệnh có lãi (lợi nhuận ròng) / Tổng số các lệnh.'
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Tỷ lệ thắng
            </Typography>
          </PopoverData>
          <Typography variant="body2">{overview.winRate}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <PopoverData
          sub='Tổng số các lệnh đã đóng trong tài khoản giao dịch sao chép hiện tại của giao dịch viên.'
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Tổng số giao dịch
            </Typography>
          </PopoverData>
          <Typography variant="body2">{overview.totalTransactions}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <PopoverData
          sub='Số lượng lệnh đã đóng bị lỗ (đã khấu trừ phí giao dịch và phí tài trợ) trong tài khoản giao dịch sao chép hiện tại của giao dịch viên.'
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Số lần lãi
            </Typography>
          </PopoverData>
          <Typography variant="body2">{overview.profitCount}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <PopoverData
          sub='Số lượng lệnh đã đóng bị lỗ (đã khấu trừ phí giao dịch và phí tài trợ) trong tài khoản giao dịch sao chép hiện tại của giao dịch viên.'
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Số lần lỗ
            </Typography>
          </PopoverData>
          <Typography variant="body2">{overview.lossCount}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <PopoverData
          sub='Lãi trung bình = Tổng lợi nhuận ròng của lệnh lãi ròng/Số lần lãi'
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lãi trung bình
            </Typography>
          </PopoverData>
          <Typography variant="body2">{overview.avgProfitAmount} ( {overview.avgProfitRate} )</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <PopoverData
            sub='Lỗ trung bình = Tổng lợi nhuận ròng của lệnh lỗ ròng/Số lần lỗ'
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lỗ trung bình
            </Typography>
          </PopoverData>
          <Typography variant="body2">{overview.avgLossAmount} ( {overview.avgLossRate} )</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <PopoverData
          sub='Tỷ lệ lãi lỗ = Lãi trung bình/Lỗ trung bình'
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Tỷ lệ lãi lỗ
            </Typography>
          </PopoverData>
          <Typography variant="body2">{overview.pnlRate}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <PopoverData
           sub='Khoảng thời gian giữ lệnh đóng của BingX dựa trên góc độ lệnh, còn Binance dựa trên góc độ vị thế'
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            TB thời gian giữ lệnh
            </Typography>
          </PopoverData>
          <Typography variant="body2">2 ngày 1 giờ</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <PopoverData
          sub='Số lần giao dịch hàng tuần, tính theo các lệnh chốt đóng.'
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Tần suất giao dịch (hàng tuần)
            </Typography>
          </PopoverData>
          <Typography variant="body2">{overview.weeklyTradeFrequency} lần</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <PopoverData
          sub='Số ngày giao dịch của giao dịch viên'
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Ngày giao dịch
            </Typography>
          </PopoverData>
          <Typography variant="body2">{overview.tradeDays} ngày</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <PopoverData
          sub='Thời điểm chốt giao dịch gần đây nhất trên tài khoản hiện tại của giao dịch viên'
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Giao dịch gần đây
            </Typography>
          </PopoverData>
          <Typography variant="body2">{new Date(overview.lastTradeTime).toLocaleDateString()}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Đơn vị tính giá:
          </Typography>
          <Typography variant="body2">USDT</Typography>
        </Stack>

      </Stack>
    </Card>
  );
}
