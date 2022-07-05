import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ClassNameCSS from "./ClassName.module.scss";
import axios from "axios";

const ClassName = (props) => {
  const [className, setClassName] = useState("");
  const [allClasses, setAllClasses] = useState();

  props.name(className);

  useEffect(() => {
    const getClassName = async () => {
      const result = await axios.get(
        "http://localhost:4000/api/class/get-class-name"
      );
      setAllClasses(result.data.classes);
    };
    getClassName();
  }, []);

  const handleChange = (event) => {
    setClassName(event.target.value);
  };

  return (
    className,
    (
      <div className={ClassNameCSS.container}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Class Name
          </InputLabel>
          <Select
            className={ClassNameCSS["class-name"]}
            value={className}
            label="Class Name"
            onChange={handleChange}
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
    )
  );
};

export default ClassName;
