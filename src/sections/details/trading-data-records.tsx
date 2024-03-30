// @mui
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// components
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';

// ----------------------------------------------------------------------

function createData(id:number,date: string, side: string, amount: string) {
  return {id,date, side, amount};
}

const TABLE_DATA = [
  createData(1,'2023-09-21 13:41:35', 'Chuyển ra', '-7,000 USDT'),
  createData(2,'2023-09-21 01:38:04', 'Chuyển ra', '-1,000 USDT'),
  createData(3,'2023-09-14 21:16:01', 'Chuyển ra', '-4,000 USDT'),
  createData(4,'2023-09-14 21:13:31', 'Chuyển vào', '+5,000 USDT'),
  createData(5,'2023-09-14 18:34:43', 'Chuyển ra', '-25,000 USDT'),
  createData(6,'2023-09-21 13:41:35', 'Chuyển ra', '-7,000 USDT'),
  createData(7,'2023-09-21 01:38:04', 'Chuyển ra', '-1,000 USDT'),
  createData(8,'2023-09-14 21:16:01', 'Chuyển ra', '-4,000 USDT'),
  createData(9,'2023-09-14 21:13:31', 'Chuyển vào', '+5,000 USDT'),
  createData(10,'2023-09-14 18:34:43', 'Chuyển ra', '-25,000 USDT'),
  createData(11,'2023-09-21 13:41:35', 'Chuyển vào', '+7,000 USDT'),
  createData(12,'2023-09-21 01:38:04', 'Chuyển ra', '-1,000 USDT'),
  createData(13,'2023-09-14 21:16:01', 'Chuyển vào', '+4,000 USDT'),
  createData(14,'2023-09-14 21:13:31', 'Chuyển ra', '-5,000 USDT'),
  createData(15,'2023-09-14 18:34:43', 'Chuyển ra', '-25,000 USDT'),
];

const TABLE_HEAD = [
  { id: 'date', label: 'Thời gian' },
  { id: 'side', label: 'Hướng', align: 'right' },
  { id: 'Amount', label: 'Số lượng', align: 'right' },
];

// ----------------------------------------------------------------------

export default function TradingDataRecord() {
  return (
    <TableContainer sx={{ mt: 3, overflow: 'unset' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }}>
          <TableHeadCustom headLabel={TABLE_HEAD} />

          <TableBody>
            {TABLE_DATA.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell align="right">{row.side}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}
