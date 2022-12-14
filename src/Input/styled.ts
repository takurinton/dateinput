import styled from "styled-components";

export const InputContainer = styled.div<{ focus: boolean; valid: boolean }>`
  display: "flex";
  width: 140px;
  border: 0;
  font-size: 14px;
  width: fit-content;
  border-bottom: solid 2px
    ${({ theme, focus, valid }) =>
      !valid
        ? theme.palette.danger.main
        : focus
        ? theme.palette.primary.main
        : theme.palette.divider};
`;

export const InputElement = styled.input<{ count: number }>`
  border: none;
  font-size: 14px;
  width: ${({ count }) => count * 8}px;
  text-align: right;
  outline: none;
`;
