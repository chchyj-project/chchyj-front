import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Common from "../style/Common";

interface SeekBarProps {
  handleChange: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void;
}
const SeekBar = ({ handleChange }: SeekBarProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        aria-label="SeekBar"
        defaultValue={0}
        valueLabelDisplay="off"
        step={1}
        min={1}
        max={5}
        marks
        onChange={handleChange}
        disableSwap
        sx={{
          "&": {
            padding: "11px 0",
          },
          "& .MuiSlider-thumb": {
            width: "10px",
            height: "10px",
            backgroundColor: `${Common.colors.red}`,
            transform: "translate(-10%, -50%)",
          },
          "& .MuiSlider-rail": {
            height: "4px",
            backgroundColor: `${Common.colors.seekBarBgColor}`,
          },
          "& .MuiSlider-track": {
            height: "4px",
            backgroundColor: `${Common.colors.red}`,
            border: "unset",
          },
          "& .MuiSlider-mark": {
            width: "4px",
            height: "4px",
            borderRadius: "4px",
            backgroundColor: `${Common.colors.seekBarMarkColor}`,
          },
          "& .MuiSlider-markActive.MuiSlider-mark": {
            width: "10px",
            height: "10px",
            borderRadius: "10px",
            opacity: "1",
            backgroundColor: `${Common.colors.red}`,
          },
        }}
      />
    </Box>
  );
};

export default SeekBar;
