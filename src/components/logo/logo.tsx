import { forwardRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';
// routes
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 40,
          height: 40,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 40 40">
          <defs>
            <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
              <stop offset="0%" stopColor={PRIMARY_DARK} />
              <stop offset="100%" stopColor={PRIMARY_MAIN} />
            </linearGradient>

            <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor={PRIMARY_LIGHT} />
              <stop offset="100%" stopColor={PRIMARY_MAIN} />
            </linearGradient>

            <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor={PRIMARY_LIGHT} />
              <stop offset="100%" stopColor={PRIMARY_MAIN} />
            </linearGradient>
          </defs>

          <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.00001 31.6667V33.3333C4.99889 33.8044 5.15834 34.2 5.47834 34.52C5.79834 34.84 6.19445 35 6.66667 35C7.13778 35.0011 7.53334 34.8417 7.85334 34.5217C8.17334 34.2017 8.33334 33.8056 8.33334 33.3333V28.3333L5.00001 31.6667ZM11.6667 25V33.3333C11.6656 33.8044 11.825 34.2 12.145 34.52C12.465 34.84 12.8611 35 13.3333 35C13.8044 35.0011 14.2 34.8417 14.52 34.5217C14.84 34.2017 15 33.8056 15 33.3333V21.6667L11.6667 25ZM18.3333 21.6667V33.3333C18.3322 33.8044 18.4917 34.2 18.8117 34.52C19.1317 34.84 19.5278 35 20 35C20.4711 35.0011 20.8667 34.8417 21.1867 34.5217C21.5067 34.2017 21.6667 33.8056 21.6667 33.3333V25.0417L18.3333 21.6667ZM25 25.0417V33.3333C24.9989 33.8044 25.1583 34.2 25.4783 34.52C25.7983 34.84 26.1944 35 26.6667 35C27.1378 35.0011 27.5333 34.8417 27.8533 34.5217C28.1733 34.2017 28.3333 33.8056 28.3333 33.3333V21.7083L25 25.0417ZM31.6667 18.3333V33.3333C31.6656 33.8044 31.825 34.2 32.145 34.52C32.465 34.84 32.8611 35 33.3333 35C33.8045 35.0011 34.2 34.8417 34.52 34.5217C34.84 34.2017 35 33.8056 35 33.3333V15L31.6667 18.3333Z"
              fill="url(#BG1)"
            />
            <path
              d="M5.47931 21.8141L14.271 13.0224C14.9099 12.3835 15.7015 12.0641 16.646 12.0641C17.5904 12.0641 18.3821 12.3835 19.021 13.0224L23.3126 17.3141L32.146 8.48077C32.4793 8.14744 32.8754 7.98744 33.3343 8.00077C33.7932 8.0141 34.1888 8.18799 34.521 8.52244C34.8265 8.85577 34.9726 9.25188 34.9593 9.71077C34.946 10.1697 34.786 10.5513 34.4793 10.8558L25.6876 19.6474C25.0488 20.2863 24.2571 20.6058 23.3126 20.6058C22.3682 20.6058 21.5765 20.2863 20.9376 19.6474L16.646 15.3558L7.81265 24.1891C7.47931 24.5224 7.0832 24.6824 6.62431 24.6691C6.16542 24.6558 5.76987 24.4819 5.43765 24.1474C5.13209 23.8141 4.98653 23.4185 5.00098 22.9608C5.01542 22.503 5.17487 22.1208 5.47931 21.8141Z"
              fill="url(#BG2)"
            />
          </g>
        </svg>
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
