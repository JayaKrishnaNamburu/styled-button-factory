import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch } from "antd";
import {
  Box,
  Text,
  StyledSwitch,
  Row,
  Col,
  Select,
  InputSlider,
  ColorPicker,
} from "../components";
import {
  setBorderColor,
  setBorderRadius,
  setBorderType,
  setBorderWidth,
  setHasBorder,
} from "../../features/ButtonBorderSlice";
import { border } from "../constants/Borders";

const ButtonBorder = () => {
  const borderState = useSelector((state) => state.present.buttonBorder);
  const dispatch = useDispatch();
  return (
    <>
      <Box boundary p="10px" width="100%" mb="5px" mt="5px">
        <Box display="flex" justifyContent="space-between">
          <Text fontWeight="400" fontSize="14px">
            Button Border
          </Text>
          <StyledSwitch>
            <Switch
              checked={borderState.hasBorder}
              onChange={() => dispatch(setHasBorder())}
              aria-label="Toggle button border"
            />
          </StyledSwitch>
        </Box>
        <Box disabled={!borderState.hasBorder}>
          <Row
            alignItems="center"
            my={["10px", "10px", "10px", "10px"]}
            display="flex"
            justifyContent="space-between"
          >
            Border Type
            <Select
              width="70%"
              placeholder="Border Type"
              values={border}
              selected={borderState.borderType}
              action={(value) => dispatch(setBorderType(value))}
            />
          </Row>
          <Row alignItems="center">
            <Col width="30%">Border Color</Col>
            <Col width="60%">
              <ColorPicker
                value={borderState.borderColor}
                action={setBorderColor}
              />
            </Col>
          </Row>
          <Row alignItems="center" my={["10px", "10px", "10px", "10px"]}>
            <Col width="30%">Width</Col>
            <Col width="70%" display="flex" justifyContent="space-between">
              <InputSlider
                value={borderState.borderWidth}
                action={setBorderWidth}
                min={1}
                max={100}
              />
            </Col>
          </Row>
          <Row alignItems="center" mb={["10px", "10px", "10px", "10px"]}>
            <Col width="30%">Radius</Col>
            <Col width="70%" display="flex" justifyContent="space-between">
              <InputSlider
                value={borderState.borderRadius}
                action={setBorderRadius}
                min={0}
                max={100}
              />
            </Col>
          </Row>
        </Box>
      </Box>
    </>
  );
};

export default ButtonBorder;
