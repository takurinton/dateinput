import { memo } from "react";
import styled from "styled-components";

export const NativeInputContainer = memo(styled.input<{ valid: boolean }>`
  border: none;
  border-bottom: 1px solid #ccc;
  border-bottom: solid 2px ${({ theme }) => theme.palette.divider};

  &::-webkit-calendar-picker-indicator {
    display: none;
  }

  &:focus {
    outline: none;
    border-bottom: solid 2px
      ${({ theme, valid }) =>
        valid ? theme.palette.primary.main : theme.palette.danger.main};
  }
`);
