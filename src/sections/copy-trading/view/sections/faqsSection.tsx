// @mui
import { Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Iconify from 'src/components/iconify';


export default function FAQsSection({ blueText }: { blueText: string }) {
  const [showTab, setShowTab] = useState<number>(1)  // 1: Người sao chép, 2: Giao dịch viên

  const hanldeChange = (value: number) => {
    setShowTab(value)
  }

  return (
    <Box>
      <Typography variant='h3' sx={{ my: 2 }} maxWidth='70%'>
        Câu hỏi thường gặp
      </Typography>
      <Box display='flex'>
        <Button onClick={() => hanldeChange(1)} sx={{ fontWeight: 500, color: showTab === 1 ? blueText : '' }} variant='soft'>Người sao chép</Button>
        <Button onClick={() => hanldeChange(2)} sx={{ fontWeight: 500, color: showTab === 2 ? blueText : '', ml: 3 }} variant='soft'>Giao dịch viên</Button>
      </Box>
      {showTab === 1 && <QuestionAndAnswer data={copyistFAQs} blueText={blueText} />}
      {showTab === 2 && <QuestionAndAnswer data={tellerFAQs} blueText={blueText} />}
    </Box >
  )
}

const QuestionAndAnswer = ({ data, blueText }: { data: { id: number; qes: string; ans: string; }[], blueText: string }) => {
  const [currentQes, setCurrentQes] = useState(1)

  const hanldeChange = (value: number) => {
    setCurrentQes(value)
  }

  const style = { width: 474, height: 36, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 24, my: 2, cursor: 'pointer' }
  const styleClicked = { width: 474, height: 'fit-content', fontSize: 24, my: 3, cursor: 'pointer', fontWeight: 700 }

  return (
    <Box display='flex' width='100%' >
      <Box width='50%'>
        {data.map(item => (
          <Box key={item.id} display='flex' alignItems='center' position='relative'>
            {item.id === currentQes && <Iconify icon="akar-icons:pointer-right-fill" width={30} height={30} position='absolute' left={-50} color={blueText} />}
            <Box
              onClick={() => hanldeChange(item.id)}
              sx={item.id === currentQes ? styleClicked : style}
            >
              {item.qes}
            </Box>
          </Box>
        ))}
      </Box>
      <Box width='50%' display='flex' alignItems='center'>
        <Box sx={{ width: 606, height: 228, overflowY: 'scroll' }}>
          {data.filter(item => item.id === currentQes).map(item => (
            <Box fontSize={16}>
              {item.ans}
            </Box>
          ))}
        </Box>
      </Box>
    </Box >
  )
}


const copyistFAQs = [
  {
    id: 1,
    qes: 'Tại sao các lệnh có lãi ở tab "Giao dịch sao chép" trong Hợp đồng vĩnh viễn lại hiển thị thua lỗ ở "Lịch sử giao dịch" trong Hợp đồng vĩnh viễn?',
    ans: 'Điều này là do Lãi lỗ trong 2 phần này được tính khác nhau. Lãi lỗ ở tab "Giao dịch sao chép" được tính dựa trên Giá mở và Giá đóng, trong khi Lãi lỗ ở mục Vị thế và Lịch sử giao dịch được tính toán dựa trên Giá vị thế trung bình và Giá đóng. Nếu lệnh được đóng khi Giá vị thế trung bình ở tab Vị thế xấu hơn Giá mở trong tab Giao dịch sao chép, lệnh có thể hiển thị Lãi lỗ dương trong Giao dịch sao chép nhưng Lãi lỗ âm ở phần Vị thế. Tuy nhiên điều này không ảnh hưởng đến lợi nhuận thực tế của lệnh. (Sau khi lệnh được đóng, nếu nó hiển thị thua lỗ trong Lịch sử giao dịch, tuy nhiên Lãi lỗ chưa thực hiện cho cùng hợp đồng với cùng hướng ở phần Vị thế lại hiển thị thua lỗ nhỏ hơn hoặc lợi nhuận lớn hơn, điều đó cho thấy rằng lệnh được đóng đã tạo ra lợi nhuận. Đây là vấn đề về cơ chế tính toán dữ liệu khác nhau và không ảnh hưởng đến Lãi lỗ thực tế của các lệnh Giao dịch sao chép của bạn. Để biết Lãi lỗ chính xác, hãy nhấn vào phần Giao dịch sao chép trên trang chủ -> Giao dịch của tôi -> Lịch sử giao dịch để xem.'
  },
  {
    id: 2,
    qes: 'Tại sao số tiền ký quỹ được sử dụng cho lệnh sao chép quá nhỏ?',
    ans: 'Chế độ "sao chép theo tỷ lệ vị thế", được hỗ trợ bởi Giao dịch sao chép Hợp đồng Binance và Giao dịch sao chép Hợp đồng vĩnh viễn, về cơ bản là sao chép tỷ lệ vị thế của giao dịch viên. Nếu giao dịch viên bạn sao chép nắm giữ một lượng tài sản lớn trong tài khoản của họ và đầu tư một số tiền ký quỹ nhỏ vào giao dịch, tỷ lệ vị thế (tỷ lệ ký quỹ trên tài sản ròng) sẽ thấp và số tiền ký quỹ bạn sử dụng cũng sẽ nhỏ theo. Ví dụ: nếu giao dịch viên nắm giữ 10,000 USDT trong tài khoản giao dịch sao chép của họ và chỉ đầu tư 100 USDT vào giao dịch, tỷ lệ vị thế của họ sẽ là 1%. Trong trường hợp này, nếu Vốn giao dịch sao chép của bạn là 100 USDT, lệnh sao chép sẽ được mở với mức ký quỹ là 1 USDT.'
  },
  {
    id: 3,
    qes: 'Tại sao ký quỹ thực tế dùng để mở lệnh ở chế độ "sao chép theo ký quỹ cố định" lại thấp hơn mức ký quỹ đã đặt?',
    ans: 'Khi sử dụng chế độ "sao chép theo ký quỹ cố định" cho Giao dịch sao chép Hợp đồng tiêu chuẩn, nếu một lệnh do giao dịch viên đặt kích hoạt hạn mức vị thế giao dịch sao chép, hệ thống sẽ giảm mức ký quỹ giao dịch sao chép của lệnh đó cho toàn bộ người sao chép. Điều này là để đảm bảo rằng những người sao chép vẫn có thể sao chép lệnh trong khuôn khổ hạn mức vị thế sau khi giảm ký quỹ. Khi sử dụng chế độ "sao chép theo ký quỹ cố định" cho Giao dịch sao chép Hợp đồng vĩnh viễn, do phí giao dịch và bảo vệ trượt giá, số tiền ký quỹ cố định mà người sao chép cài đặt trong Giao dịch sao chép Hợp đồng vĩnh viễn có thể sẽ không được thực hiện ở chính xác con số đó. Do đó, ký quỹ mở thực tế của người sao chép có thể khác với mức ký quỹ cố định họ cài đặt từ trước.'
  },
  {
    id: 4,
    qes: 'Tại sao tôi không thực hiện được giao dịch sao chép?',
    ans: 'Sử dụng nhiều tài khoản. 1. Người sao chép phải xóa các toàn khoản khác và hoàn tất xác thực KYC để sử dụng tính năng giao dịch sao chép. 2. Giao dịch viên chỉ cho phép người dùng họ mời được quyền sao chép giao dịch của họ. 3. Giao dịch viên không thể sao chép theo giao dịch viên khác.'
  }
]
const tellerFAQs = [
  {
    id: 1,
    qes: 'Tại sao ROI có thay đổi khi mà tôi không giao dịch?',
    ans: 'Cách tính ROI (Return on Investment - Tỷ suất lợi tức) sử dụng phương pháp ROI theo trọng số thời gian. ROI có thể thay đổi tùy vào biến đổi trong Lãi lỗ chưa thực hiện của các vị thế. Lấy ROI 30 ngày qua làm ví dụ: ROI 30 ngày qua = (1+ROI của tuần 1)*(1+ROI của tuần 2)...*(1+ROI của tuần n) - 1. ROI hàng tuần = (Vốn chủ sở hữu ròng vào cuối tuần + số tiền rút ra trong tuần) / (vốn chủ sở hữu ròng vào đầu tuần + số tiền nạp vào trong tuần) Do phương thức tính ROI hàng tuần có bao gồm các khoản tiền rút ra và nạp vào, các khoản tiền nạp và rút lớn của giao dịch viên có thể làm ảnh hưởng đến việc tính toán ROI hàng tuần, dẫn đến thay đổi ROI của giao dịch viên trong khi không có phát sinh bất kỳ hoạt động giao dịch.'
  },
  {
    id: 2,
    qes: 'Cần lưu ý những gì khi giao dịch viên chia sẻ giao dịch theo tỷ lệ vị thế?',
    ans: 'Chế độ "Sao chép theo tỷ lệ vị thế" áp dụng cho cả Giao dịch sao chép Hợp đồng vĩnh viễn và Giao dịch sao chép Hợp đồng Binance. Khi sử dụng chế độ này trong Giao dịch sao chép, giao dịch viên nên lưu ý tới những điều sau: 1. Tránh nạp tiền nhiều khi đang nắm giữ vị thế. Lý do: Ở chế độ "sao chép theo tỷ lệ vị thế", tỷ lệ vị thế của giao dịch viên và người sao chép được căn chỉnh. Khi giao dịch viên nạp vào một khoản tiền đáng kể trong lúc nắm giữ vị thế, nó làm giảm tỷ lệ vị thế của giao dịch viên đó. Vị thế của người sao chép khi đó sẽ tự động được căn chỉnh với giao dịch viên, dẫn đến việc giảm vị thế của người sao chép. 2. Tránh giao dịch các loại tiền crypto có vốn hóa thấp với đòn bẩy cao và tỷ lệ vị thế lớn. Lý do: Giá mở, giá đóng và tỷ lệ Lãi lỗ của người sao chép có thể khác biệt so với giao dịch viên do bởi các yếu tố khách quan và dễ thấy như biến động thị trường và độ sâu thị trường. Trong điều kiện thị trường khắc nghiệt, các chênh lệch này có thể nới rộng và dẫn đến việc giao dịch có lãi cho bạn nhưng người sao chép bạn lại bị thua lỗ. 3. Tránh các chiến lược như phòng vệ giá, Giao dịch lưới, chiến lược Martingale hay giao dịch tần suất cao. Lý do: Các loại chiến lược trên đòi hỏi các vị thế của giao dịch viên và người sao chép phải được căn chỉnh chặt chẽ. Do các yếu tố khách quan như biến động với độ sâu thị trường, các vị thế có thể bị căn chỉnh sai lệch, dẫn đến thua lỗ cho người sao chép. '
  },
  {
    id: 3,
    qes: 'Phần chia sẻ lợi nhuận cho giao dịch viên được quyết toán như nào?',
    ans: 'Phần chia sẻ lợi nhuận của giao dịch viên = Lợi nhuận ròng của người sao chép x tỷ lệ chia sẻ lợi nhuận của giao dịch viên, trong đó lợi nhuận ròng của người sao chép là phần lợi nhuận sau khi khấu trừ phí giao dịch, phí tài trợ và hoa hồng giới thiệu. "Lợi nhuận người sao chép" được hiển thị trên trang hồ sơ của giao dịch viên chưa khấu trừ phí và các khoản phí khác từ lợi nhuận của người sao chép, do đó giá trị lợi nhuận của người sao chép mà phần chia sẻ lợi nhuận được dựa trên thực tế khác với "Lợi nhuận người sao chép" được hiển thị trên trang hồ sơ của giao dịch viên.'
  },
  {
    id: 4,
    qes: 'Phí giao dịch sao chép là bao nhiêu?',
    ans: 'Lệ phí cho Hợp đồng tiêu chuẩn và Giao dịch sao chép Hợp đồng tiêu chuẩn có cùng mức là 0.045% khối lượng giao dịch và chỉ được thu khi đóng vị thế. Lệ phí Giao dịch sao chép Hợp đồng Binance là 0.05% và được thu khi mở và đóng vị thế. Lệ phí Giao dịch sao chép Lưới spot và Giao dịch spot có cùng mức là 0.01% khối lượng giao dịch.'
  }
]

