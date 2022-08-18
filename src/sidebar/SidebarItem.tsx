import { Menu, MenuItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import {
  usePopupState,
  bindHover,
  bindMenu,
} from "material-ui-popup-state/hooks";

interface SidebarItemProps {
  home?: boolean;
  text: string;
  to: string;
  subItems?: {
    text: string;
    to: string;
  }[];
}

export function SidebarItem({
  text,
  to,
  subItems,
}: SidebarItemProps): JSX.Element {
  const menuState = usePopupState({ variant: "popover", popupId: text });
  if (subItems) {
    return (
      <>
        <div className="nav-item">
          <span {...bindHover(menuState)}>{text}</span>
        </div>
        <Menu {...bindMenu(menuState)}>
          {subItems.map((ele, idx) => (
            <MenuItem onClick={menuState.close} key={idx}>
              <NavLink className="nav-item" to={ele.to}>
                {ele.text}
              </NavLink>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }
  return (
    <NavLink to={to} className="nav-item">
      <span className="nav-text">{text}</span>
    </NavLink>
  );
}
