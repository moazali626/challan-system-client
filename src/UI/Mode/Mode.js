import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ModeCSS from "./Mode.module.scss";

const Mode = (props) => {
  const [mode, setMode] = React.useState("");

  props.name(mode);

  const handleChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <div className={ModeCSS.container}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Mode</InputLabel>
        <Select
          className={ModeCSS["class-name"]}
          value={mode}
          label="Mode"
          onChange={handleChange}
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Mode;
