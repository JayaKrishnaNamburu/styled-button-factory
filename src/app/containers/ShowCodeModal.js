import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";
import { Modal } from "../components";
import { CopyButton } from "../components/";
import { getShadow, getBackground, getBorder } from "../helpers";

const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: #5c3aff;
  }
`;

const ShowCodeModal = ({ isOpen, handleOpenModal }) => {
  const buttonDefault = useSelector((state) => state.present.buttonDefault);
  const [code, setCode] = useState("");
  const buttonBackground = useSelector(
    (state) => state.present.buttonBackground
  );
  const buttonBorder = useSelector((state) => state.present.buttonBorder);
  const buttonShadow = useSelector((state) => state.present.buttonShadow);
  const hoverButtonDefault = useSelector(
    (state) => state.present.hoverButtonDefault
  );
  const hoverButtonBackground = useSelector(
    (state) => state.present.hoverButtonBackground
  );
  const hoverButtonBorder = useSelector(
    (state) => state.present.hoverButtonBorder
  );
  const hoverButtonShadow = useSelector(
    (state) => state.present.hoverButtonShadow
  );
  const generateCode = useCallback(() => {
    let styledButton = `import styled from "styled-components";\n\n`;
    styledButton += "const StyledButton = styled.button`\n";
    if (buttonDefault.font)
      styledButton += `\tfont-family: ${buttonDefault.font};\n`;
    styledButton += `\tfont-size: ${buttonDefault.fontSize}px;\n`;
    if (buttonDefault.fontWeight)
      styledButton += `\tfont-weight: ${buttonDefault.fontWeight};\n`;
    styledButton += `\tcolor: ${buttonDefault.textColor};\n`;
    if (buttonDefault.paddingX !== 0 || buttonDefault.paddingY !== 0)
      styledButton += `\tpadding: ${buttonDefault.paddingY}px ${buttonDefault.paddingX}px;\n`;
    if (buttonDefault.cursor)
      styledButton += `\tcursor: ${buttonDefault.cursor};\n`;
    styledButton += getBackground(
      buttonBackground.backgroundType,
      buttonBackground.backgroundColor,
      buttonBackground.gradientType,
      buttonBackground.gradientStart,
      buttonBackground.gradientEnd,
      buttonBackground.gradientAngle
    );
    if (buttonShadow.hasShadow)
      styledButton += `\tbox-shadow:${getShadow(
        buttonShadow.shadowType,
        buttonShadow.horizontalPlacement,
        buttonShadow.verticalPlacement,
        buttonShadow.blur,
        buttonShadow.spread,
        buttonShadow.shadowColor
      )};\n`;
    if (buttonBorder.hasBorder)
      styledButton += getBorder(
        buttonBorder.borderType,
        buttonBorder.borderColor,
        buttonBorder.borderWidth
      );
    if (buttonBorder.hasBorder)
      styledButton += `\tborder-radius: ${buttonBorder.borderRadius}px;\n`;
    if (hoverButtonDefault.enableHover) {
      styledButton += `\t&:hover {\n`;
      styledButton += `\t\tfont-size: ${hoverButtonDefault.fontSize}px;\n`;
      styledButton += `\t\tcolor: ${hoverButtonDefault.textColor};\n`;
      styledButton += `\t${getBackground(
        hoverButtonBackground.backgroundType,
        hoverButtonBackground.backgroundColor,
        hoverButtonBackground.gradientType,
        hoverButtonBackground.gradientStart,
        hoverButtonBackground.gradientEnd,
        hoverButtonBackground.gradientAngle
      )}`;
      if (hoverButtonShadow.hasShadow) {
        styledButton += `\t\tbox-shadow:${getShadow(
          hoverButtonShadow.shadowType,
          hoverButtonShadow.horizontalPlacement,
          hoverButtonShadow.verticalPlacement,
          hoverButtonShadow.blur,
          hoverButtonShadow.spread,
          hoverButtonShadow.shadowColor
        )};\n`;
      }
      if (hoverButtonBorder.hasBorder) {
        styledButton += `\t${getBorder(
          hoverButtonBorder.borderType,
          hoverButtonBorder.borderColor,
          hoverButtonBorder.borderWidth,
          hoverButtonBorder.borderRadius
        )}`;
      }
      if (hoverButtonBorder.hasBorder) {
        styledButton += `\t\tborder-radius: ${hoverButtonBorder.borderRadius}px;\n`;
      }
      styledButton += "\t}\n";
    }
    styledButton += "`\n";
    styledButton += "export default StyledButton;\n";
    return styledButton;
  }, [
    buttonBackground.backgroundColor,
    buttonBackground.backgroundType,
    buttonBackground.gradientAngle,
    buttonBackground.gradientEnd,
    buttonBackground.gradientStart,
    buttonBackground.gradientType,
    buttonBorder.borderColor,
    buttonBorder.borderRadius,
    buttonBorder.borderType,
    buttonBorder.borderWidth,
    buttonBorder.hasBorder,
    buttonDefault.cursor,
    buttonDefault.font,
    buttonDefault.fontSize,
    buttonDefault.fontWeight,
    buttonDefault.paddingX,
    buttonDefault.paddingY,
    buttonDefault.textColor,
    buttonShadow.blur,
    buttonShadow.hasShadow,
    buttonShadow.horizontalPlacement,
    buttonShadow.shadowColor,
    buttonShadow.shadowType,
    buttonShadow.spread,
    buttonShadow.verticalPlacement,
    hoverButtonBackground.backgroundColor,
    hoverButtonBackground.backgroundType,
    hoverButtonBackground.gradientAngle,
    hoverButtonBackground.gradientEnd,
    hoverButtonBackground.gradientStart,
    hoverButtonBackground.gradientType,
    hoverButtonBorder.borderColor,
    hoverButtonBorder.borderRadius,
    hoverButtonBorder.borderType,
    hoverButtonBorder.borderWidth,
    hoverButtonBorder.hasBorder,
    hoverButtonDefault.enableHover,
    hoverButtonDefault.fontSize,
    hoverButtonDefault.textColor,
    hoverButtonShadow.blur,
    hoverButtonShadow.hasShadow,
    hoverButtonShadow.horizontalPlacement,
    hoverButtonShadow.shadowColor,
    hoverButtonShadow.shadowType,
    hoverButtonShadow.spread,
    hoverButtonShadow.verticalPlacement,
  ]);
  useEffect(() => {
    isOpen && setCode(generateCode());
  }, [generateCode, isOpen]);

  return (
    <Modal isOpen={isOpen} handleClose={() => handleOpenModal(false)}>
      <ModalContent>
        <SyntaxHighlighter
          language="javascript"
          style={coldarkDark}
          customStyle={{ width: "100%" }}
        >
          {code}
        </SyntaxHighlighter>
        <CopyButton text={code} />
      </ModalContent>
    </Modal>
  );
};

export default ShowCodeModal;
