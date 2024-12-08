import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CustomDatePicker from './CustomDatePicker';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';
import ColorModeIconDropdown from '../../theme/ColorModeIconDropdown';

import Search from './Search';
import { PageType } from './Layout';
import { InspectionContentType } from '../../models/all.types';

export type ContentHeaderProps = {
  pageType: PageType;
  contentType?: InspectionContentType;
};

export default function ContentHeader({
  pageType,
  contentType,
}: ContentHeaderProps) {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1200px' },
        // pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs pageType={pageType} contentType={contentType} />
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        <CustomDatePicker />
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
