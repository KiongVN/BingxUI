import { Helmet } from 'react-helmet-async';
// sections
import { CopyTradingView } from 'src/sections/copy-trading/view';

export default function CopyTradingPage() {
  return (
    <>
      <Helmet>
        <title> CopyTraning Page</title>
      </Helmet>

      <CopyTradingView />
    </>
  )
}
