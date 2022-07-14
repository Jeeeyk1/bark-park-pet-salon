import { useMediaQuery, useTheme } from "@material-ui/core";
import AppbarDesktop from "./appbarDesktop";
import AppbarMobile from "./appbarMobile";

export default function AppBar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return <>{matches ? <AppbarMobile /> : <AppbarDesktop />}</>;
}
