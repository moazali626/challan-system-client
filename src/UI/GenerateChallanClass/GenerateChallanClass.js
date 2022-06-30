import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import GenerateChallanCSS from "./GenerateChallanClass.module.scss";
import axios from "axios";

const GenerateChallanClass = (props) => {
  const [className, setClassName] = useState("");
  const [allClasses, setAllClasses] = useState("");

  useEffect(() => {
    const getClassNames = async () => {
      const result = await axios.get("http://localhost:4000/get-class-name");
      setAllClasses(result.data);
    };
    getClassNames();
  }, []);

  const handleChange = (event) => {
    setClassName(event.target.value);
    //sending data (className) from generateChallanClass to generateChallan component (child to parent)
    props.className(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Class Name</InputLabel>
        <Select
          value={className}
          label="Class Name"
          onChange={handleChange}
          className={GenerateChallanCSS["select-class-name"]}
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {allClasses &&
            allClasses.map((element) => {
              return (
                <MenuItem value={element.className}>
                  {element.className}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </div>
  );
};

export default GenerateChallanClass;
