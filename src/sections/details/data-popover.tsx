
import { Box, BoxProps, Popover, Typography } from '@mui/material';
import  { usePopover } from 'src/components/custom-popover';

//--------------------------------------------------------------------
interface Props extends BoxProps {
  sub: string;
  };



//--------------------------------------------------------------------
export default function PopoverData({ sub,children, ...other }: Props) {

  const hoverPopover = usePopover();


  return (
  <>
     <Box
              aria-owns={hoverPopover.open ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={hoverPopover.onOpen}
              onMouseLeave={hoverPopover.onClose}
            >
              {children}
            </Box>
            <Popover
              id="mouse-over-popover"
              open={Boolean(hoverPopover.open)}
              anchorEl={hoverPopover.open}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={hoverPopover.onClose}
              disableRestoreFocus
              sx={{
                pointerEvents: 'none',
              }}
            >
              <Box sx={{ p: 2, maxWidth: 280 }}>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {sub}
                </Typography>
              </Box>
            </Popover>
  </>
  );
            }
