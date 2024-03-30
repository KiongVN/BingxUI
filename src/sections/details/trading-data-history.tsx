
// @mui
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// components
import Scrollbar from 'src/components/scrollbar';
import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';

// ----------------------------------------------------------------------

function createData(id:number,code:string,futures: string,openPr:number,closePr:number,date:Date, roi: number) {
  return {id,code,futures,openPr,closePr,date, roi};
}

const TABLE_DATA = [
  createData(1,'BLURUSDT','10X',0.5227784,0.6292751,new Date(), -9.99),
  createData(2,'STRAXUSDT','20X',1.0938604,1.1956,new Date(), -1.38),
  createData(3,'BLURUSDT','10X',0.5227784,0.6292751,new Date(), +73.05),
  createData(4,'BLURUSDT','10X',0.5227784,0.6292751,new Date(), +73.05),
  createData(5,'BLURUSDT','10X',0.5227784,0.6292751,new Date(), -6.86),
  createData(6,'STRAXUSDT','20X',1.0938604,1.1956,new Date(), +11.96),
  createData(7,'STRAXUSDT','20X',1.0938604,1.1956,new Date(), -1.38),
  createData(8,'BLURUSDT','10X',0.5227784,0.6292751,new Date(), +14.51),
  createData(9,'STRAXUSDT','20X',1.0938604,1.1956,new Date(), -9.99),
  createData(10,'STRAXUSDT','20X',1.0938604,1.1956,new Date(), -1.38),
  createData(11,'BLURUSDT','10X',0.5227784,0.6292751,new Date(), +73.05),
  createData(12,'BLURUSDT','10X',0.5227784,0.6292751,new Date(), +73.05),
  createData(13,'BLURUSDT','10X',0.5227784,0.6292751,new Date(), -6.86),
  createData(14,'STRAXUSDT','20X',1.0938604,1.1956,new Date(), +11.96),
  createData(15,'STRAXUSDT','20X',1.0938604,1.1956,new Date(), -1.38),
  createData(16,'BLURUSDT','10X',0.5227784,0.6292751,new Date(), +14.51),
];


// ----------------------------------------------------------------------

export default function TradingDataHistory() {

  return (
     <Stack direction='column' alignItems='center' justifyContent='center' spacing={3}>
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
                    Cặp giao dịch
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={1}
                    sx={{
                      background: (theme) => theme.palette.background.paper,
                    }}
                  >
                    Giá mở trung bình
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={1}
                    sx={{
                      background: (theme) => theme.palette.background.paper,
                    }}
                  >
                    Giá đóng
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={1}
                    sx={{
                      background: (theme) => theme.palette.background.paper,
                    }}
                  >
                    Thời gian đóng
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
                            <Stack>
                            <Typography variant="h5" sx={{}}>{row.code}</Typography>
                              <Stack direction="row" spacing={3}>
                                <Box component="div" sx={{border:"solid 2px gray", borderRadius:"5px", width:"31px", textAlign: "center"}}>{row.futures}</Box>
                                <Box component="div" sx={{color: row.roi > 0 ? "primary.main" : "error.main",border:"solid 2px", borderRadius:"5px", width:"40px", textAlign: "center"}}>{row.roi > 0 ? "Long" : "Short"}</Box>
                              </Stack>
                            </Stack>

                          </TableCell>
                          <TableCell align="left" sx={{ }}>
                            {row.openPr}
                          </TableCell>
                          <TableCell align="left" sx={{  }}>
                            {row.closePr}
                          </TableCell>
                          <TableCell align="left" sx={{ }}>
                            {row.date.toLocaleDateString()}
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
        <Button variant="outlined">
          Xem thêm
        </Button>
     </Stack>
  );
}
