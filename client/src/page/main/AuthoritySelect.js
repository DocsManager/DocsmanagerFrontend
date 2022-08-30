import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AuthoritySelect({ search }) {
  const [authority, setAuthority] = useState("READ");
  const handleChange = (event) => {
    setAuthority(event.target.value);
    search.authority = event.target.value;
  };
  useEffect(() => {
    search.authority
      ? setAuthority(search.authority)
      : (search.authority = authority);
  }, []);

  return (
    <Box sx={{ minWidth: 80, maxHeight: 40 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">권한</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={authority}
          label="권한"
          onChange={handleChange}
        >
          <MenuItem value={"READ"}>읽기</MenuItem>
          <MenuItem value={"WRITE"}>쓰기</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
