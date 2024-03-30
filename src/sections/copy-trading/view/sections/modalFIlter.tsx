import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Iconify from 'src/components/iconify';
import Slider from '@mui/material/Slider';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '20%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  paddingY: 2,
  paddingLeft: 2
};
interface SliderProps {
  title: string
  maxNumber: number
  step: number
  returnRank?: boolean
}
interface ModalProps {
  open: boolean,
  handleClose: () => void
}
const buttonFilter = [
  {
    id: 1,
    name: 'Toàn bộ'
  },
  {
    id: 2,
    name: 'HĐ tiêu chuẩn BingX'
  },
  {
    id: 3,
    name: 'Hợp đồng vĩnh viễn BingX'
  },
  {
    id: 4,
    name: 'Hợp đồng Binance'
  }
]
export default function ModalFilter({ open, handleClose }: ModalProps) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography variant="subtitle1" component="h2">
              Điều kiện chọn lọc
            </Typography>
            <Button onClick={() => handleClose()} variant='text'>
              <Iconify icon="material-symbols:close" />
            </Button>
          </Box>
          <Box sx={{ maxHeight: 550, overflowY: 'scroll' }}>
            <Typography variant='body2' sx={{ my: 2 }}>
              Tài khoản giao dịch sao chép
            </Typography>
            <Box>
              {buttonFilter.map((item, index) => (
                <Button variant='soft' key={index} sx={{ mr: 1, my: 1, borderRadius: 8, fontWeight: 600 }}>
                  {item.name}
                </Button>
              ))}
            </Box>
            <Box>
              <SliderItem title='Cấp độ tài khoản' maxNumber={3} step={1} returnRank />
              <SliderItem title='Lũy kế lãi lỗ (USDT)' maxNumber={2000} step={200} />
              <SliderItem title='Tài sản tài khoản (USDT)' maxNumber={10000} step={1000} />
              <SliderItem title='Số người sao chép' maxNumber={3000} step={300} />
              <SliderItem title='Lũy kế thu nhập người sao chép (USDT)' maxNumber={10000} step={1000} />
              <SliderItem title='Tỷ suất 30 ngày qua (%)' maxNumber={200} step={20} />
              <SliderItem title='Rủi ro' maxNumber={9} step={1} />
              <SliderItem title='Tỷ lệ thắng (%)' maxNumber={100} step={10} />
              <SliderItem title='Tỷ lệ lãi lỗ' maxNumber={3} step={1} />
              <SliderItem title='TB thời gian giữ lệnh (giờ)' maxNumber={50} step={1} />
              <SliderItem title='Ngày giao dịch (ngày)' maxNumber={600} step={60} />
            </Box>
          </Box>
          <Box display='flex' justifyContent='space-evenly' paddingY={2}>
            <Button variant='outlined' sx={{ paddingX: 3 }} onClick={handleClose}>Thiết lập lại</Button>
            <Button variant='contained' sx={{ paddingX: 3 }} onClick={handleClose}>Xác nhận</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

const SliderItem = ({ title, maxNumber, returnRank, step }: SliderProps) => {
  const [value, setValue] = React.useState<number[]>()

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const returnRankValues = (inputValue: any) => {
    switch (inputValue) {
      case undefined:
        return 'Đồng - Kim cương'
      case 0:
        return 'Đồng - Kim cương'
      case 1:
        return 'Bạc - Kim cương'
      case 2:
        return 'Vàng - Kim cương'
      case 3:
        return 'Kim cương - Kim cương'
      default:
        throw new Error('Invalid input value')
    }
  }

  return (
    <Box width={300} px={1}>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='body2' sx={{ my: 2 }} maxWidth='70%'>
          {title}
        </Typography>
        <Typography variant='caption' sx={{ my: 2 }}>
          {returnRank ? returnRankValues(value) : `${value || 0} - ${maxNumber}+`}
        </Typography>
      </Box>
      <Box px={2}>
        <Slider
          value={value}
          onChange={(event, newVal) => handleChange(event, newVal)}
          step={step}
          min={0}
          max={maxNumber}
        />
      </Box>
    </Box>
  );
}
