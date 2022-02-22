import "./styles.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import * as React from "react";

export default function StatusBar() {
  const [value, setValue] = React.useState("one");
  const handleChange = (event: React.SyntheticEvent, newValue) => {
    setValue(newValue);
  };
  return (
    <div class="tab-div">
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs"
        centered
      >
        <Tab value="one" label="Running" />
        <Tab value="two" label="Upcoming" />
        <Tab value="three" label="Closed" />
      </Tabs>
    </div>
  );
}
