import { Outlet } from "react-router-dom";
import "./Sidebar.css";
import { SidebarItem } from "./SidebarItem";

export function Sidebar(): JSX.Element {
  return (
    <header className="header">
      <div className="nav">
        <SidebarItem to="/" text="Home" />
        <SidebarItem
          to="/concerntrate"
          home
          text="Works"
          subItems={[
            {
              text: "Concerntrate",
              to: "/concerntrate",
            },
            { text: "Contact book", to: "/contact-book" },
          ]}
        />
        <SidebarItem to="/" text="Blog" />
        <SidebarItem to="/message" text="Contact" />
      </div>
      <Outlet />
    </header>
  );
}
