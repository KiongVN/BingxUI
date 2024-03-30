
// @mui
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// components
import Scrollbar from 'src/components/scrollbar';
import { useTable, TablePaginationCustom } from 'src/components/table';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';

// ----------------------------------------------------------------------

function createData(id:number,futures: string, roi: number) {
  return {id,futures, roi};
}

const TABLE_DATA = [
  createData(1,'10X', -9.99),
  createData(2,'20X', -1.38),
  createData(3,'10X', +73.05),
  createData(4,'10X', +73.05),
  createData(5,'10X', -6.86),
  createData(6,'20X', +11.96),
  createData(7,'20X', -1.38),
  createData(8,'10X', +14.51),
  createData(9,'20X', -9.99),
  createData(10,'20X', -1.38),
  createData(11,'10X', +73.05),
  createData(12,'10X', +73.05),
  createData(13,'10X', -6.86),
  createData(14,'20X', +11.96),
  createData(15,'20X', -1.38),
  createData(16,'10X', +14.51),
];


// ----------------------------------------------------------------------

export default function TradingDataCurrent() {

  return (
    <Stack spacing={3}>
    <Box component="div" sx={{ color: 'text.secondary',backgroundColor:'grey.100' , typography: 'body2', width: '100%', height: "30px", lineHeight: "30px", borderRadius: "5px", pl: 5 }}>
    Giao dịch viên đã bật tính năng Bảo vệ chiến lược. Một phần thông tin của lệnh đã được ẩn đi.
    </Box>
            <Stack direction="row" spacing={3} sx={{pl:5}}>
              <Typography variant="subtitle1" sx={{}}>Tỷ lệ tổng thể vị thế giữ:</Typography>
              <Stack direction="row" >
                <Typography variant="body1" sx={{color:'primary.main'}}> Long</Typography>
                <Typography variant="body1" sx={{}}> ：5.94X</Typography>
              </Stack>

              <Stack direction="row" >
                <Typography variant="body1" sx={{color:'error.main'}}>Short</Typography>
                <Typography variant="body1" sx={{}}> ：0X</Typography>
              </Stack>

            </Stack>

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar sx={{ maxHeight: 800 }}>
          <Table stickyHeader sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  colSpan={1}
                  sx={{
                    background: (theme) => theme.palette.background.paper,
                  }}
                >
                  Hợp đồng
                </TableCell>
                <TableCell
                  align="left"
                  colSpan={1}
                  sx={{ background: (theme) => theme.palette.background.paper }}
                >
                  Tỷ suất lợi tức
                </TableCell>
              </TableRow>

            </TableHead>

            <TableBody>

                   {TABLE_DATA.map((row) => (
                      <TableRow hover key={row.id}>
                        <TableCell>
                          <Stack direction="row" spacing={3}>
                            <Box component="div" sx={{border:"solid 2px gray", borderRadius:"5px", width:"31px", textAlign: "center"}}>{row.futures}</Box>
                            <Box component="div" sx={{color: row.roi > 0 ? "primary.main" : "error.main",border:"solid 2px", borderRadius:"5px", width:"40px", textAlign: "center"}}>{row.roi > 0 ? "Long" : "Short"}</Box>
                          </Stack>
                        </TableCell>
                        <TableCell align="left" sx={{ color: row.roi > 0 ? "primary.main" : "error.main" }}>
                          {row.roi}%
                        </TableCell>
                      </TableRow>
                    ))}


            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Box component="div" sx={{ color: 'text.secondary',backgroundColor:'grey.100' , typography: 'body2', width: '100%', height: "30px", lineHeight: "30px", borderRadius: "5px", textAlign:"center", mb: 5 }}>
    Đã hiển thị toàn bộ
    </Box>
    </Stack>
  );
}
