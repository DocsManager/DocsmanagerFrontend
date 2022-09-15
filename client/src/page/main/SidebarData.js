import React from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";

export const SidebarData = [
  {
    title: "내 문서함",
    icon: <FolderOpenIcon fontSize="1.2em" />,
    path: "/main",
    tooltip: "내 문서함",
  },
  {
    title: "공유 문서함",
    icon: <FolderSharedOutlinedIcon fontSize="1.2em" />,
    path: "/main/share",
    tooltip: "나와 공유된 항목",
  },
  {
    title: "중요 문서함",
    icon: <StarBorderOutlinedIcon fontSize="1.2em" />,

    path: "/main/important",
    tooltip: "중요 문서함",
  },
  {
    title: "워크스페이스",
    icon: <KeyboardAltOutlinedIcon fontSize="1em" />,

    path: "/main/workspace",
    tooltip: "나와 공유된 워크스페이스",
  },
  {
    title: "휴지통",
    icon: <DeleteOutlineOutlinedIcon fontSize="1.2em" />,

    path: "/main/trashcan",
    tooltip: "휴지통 항목",
  },
];
