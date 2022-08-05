import React from "react";
import * as FaIcons from "react-icons/fa";

export const SidebarData = [
  {
    title: "내 문서함",
    icon: <FaIcons.FaFolder />,
    path: "/main",
  },
  {
    title: "공유 문서함",
    icon: <FaIcons.FaFolder />,
    path: "share",
  },
  {
    title: "워크스페이스",
    icon: <FaIcons.FaLaptop />,
    path: "workspace",
  },
  {
    title: "휴지통",
    icon: <FaIcons.FaTrashAlt />,
    path: "trash",
  },
];
