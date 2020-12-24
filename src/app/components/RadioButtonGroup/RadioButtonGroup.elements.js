import styled, { css } from "styled-components";
import { space, layout, typography } from "styled-system";

export const RadioGroup = styled.div`
  background: rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  display: grid;
  gap: 0.2rem;
  grid-template-columns: repeat(2, 1fr);
  width: auto;
  ${space}
  ${layout}
`;

export const RadioInput = styled.input`
  display: none;
  &[type="radio"] {
  }
`;

const activeState = css`
  background: #ffffff;
  box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

export const RadioButton = styled.label`
  ${({ active }) => active && activeState};
  text-align: center;
  ${typography};
  padding: 10px;
  ${space}
  &:hover {
    background: #ffffff;
    box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
`;
