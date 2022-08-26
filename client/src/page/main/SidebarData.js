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
    path: "/main/share",
  },
  {
    title: "중요 문서함",
    icon: <FaIcons.FaStar />,
    path: "/main/important",
  },
  {
    title: "워크스페이스",
    icon: <FaIcons.FaLaptop />,
    path: "/main/workspace",
  },
  {
    title: "휴지통",
    icon: <FaIcons.FaTrashAlt />,
    path: "/main/trashcan",
  },
];
