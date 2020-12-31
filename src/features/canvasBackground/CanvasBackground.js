import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setBackgroundType,
  setBackgroundColor,
  setGradientType,
  setGradientStart,
  setGradientEnd,
  setGradientAngle,
} from "./canvasBackgroundSlice";
import { Box, RadioButtonGroup, ColorPicker, Text } from "../../app/components";
import CircularSlider from "@fseehawer/react-circular-slider";
import { useDebouncedEffect } from "../../app/hooks/useDebouncedEffect";

const backgroundTypes = ["Gradient", "Solid"];
const gradientTypes = ["Linear", "Radial"];

const CanvasBackground = () => {
  const canvasState = useSelector((state) => state.canvas);
  const [angle, setAngle] = useState(canvasState.gradientAngle);
  const dispatch = useDispatch();
  useDebouncedEffect(
    () => {
      dispatch(setGradientAngle(angle));
    },
    100,
    [angle]
  );

  return (
    <Box shadow p="10px">
      <Text fontWeight="bold" fontSize="14px">
        Canvas Background
      </Text>
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr 1fr"
        gridTemplateRows="1fr 1fr  1fr 1fr"
        gridGap="0.2rem"
        gridTemplateAreas="
        'BackgroundType GradientSolid GradientSolid .'
        'GradientType LinearSolid LinearSolid .'
        'GradientStart StartColor StartColor Angle'
        'GradientEnd EndColor EndColor Angle'"
      >
        <Box gridArea="BackgroundType" alignSelf="center">
          Background Type
        </Box>
        <Box gridArea="GradientSolid" alignSelf="center">
          <Box display="grid" alignItems="center">
            <RadioButtonGroup
              values={backgroundTypes}
              selected={canvasState.backgroundType}
              onChange={(e) => dispatch(setBackgroundType(e.target.value))}
            />
          </Box>
        </Box>
        <Box gridArea="GradientType" alignSelf="center">
          Gradient Type
        </Box>
        <Box gridArea="LinearSolid" alignSelf="center">
          <Box display="grid" alignItems="center">
            <RadioButtonGroup
              values={gradientTypes}
              selected={canvasState.gradientType}
              onChange={(e) => dispatch(setGradientType(e.target.value))}
            />
          </Box>
        </Box>
        <Box gridArea="GradientStart" alignSelf="center">
          Gradient Start
        </Box>
        <Box gridArea="StartColor" alignSelf="center">
          <ColorPicker
            value={canvasState.gradientStart}
            onChange={(e) => dispatch(setGradientStart(e.target.value))}
          />
        </Box>
        <Box gridArea="GradientEnd" alignSelf="center">
          Gradient End
        </Box>
        <Box gridArea="EndColor" alignSelf="center">
          <ColorPicker
            value={canvasState.gradientEnd}
            onChange={(e) => dispatch(setGradientEnd(e.target.value))}
          />
        </Box>
        <Box
          gridArea="Angle"
          alignSelf="center"
          justifySelf="center"
          style={{ zIndex: "0" }}
        >
          <CircularSlider
            min={0}
            max={360}
            direction={-1}
            dataIndex={canvasState.gradientAngle}
            knobPosition="right"
            knobSize={28}
            knobColor="#000000"
            trackColor="#0000000d"
            appendToValue="°"
            label="Angle"
            labelFontSize="0.6rem"
            valueFontSize="0.9rem"
            verticalOffset="1rem"
            progressColorFrom="#d9971c"
            progressColorTo="#d9971c"
            trackSize={4}
            progressSize={4}
            width="70"
            onChange={(value) => setAngle(value)}
          ></CircularSlider>
        </Box>
      </Box>
    </Box>
  );
};

export default CanvasBackground;
