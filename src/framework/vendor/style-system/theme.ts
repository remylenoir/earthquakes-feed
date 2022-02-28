import { defaultTheme } from "@xstyled/styled-components";

// Spaces are based on 8px unit instead of 0.25rem default
const space = {
  0: "0",
  0.5: "4px",
  1: "8px",
  1.5: "12px",
  2: "16px",
  2.5: "20px",
  3: "24px",
  3.5: "28px",
  4: "32px",
  5: "40px",
  6: "48px",
  7: "56px",
  8: "64px",
  9: "72px",
  10: "80px",
  11: "88px",
  12: "96px",
  14: "112px",
  16: "128px",
  20: "160px",
  24: "192px",
  28: "224px",
  32: "256px",
  36: "288px",
  40: "320px",
  44: "352px",
  48: "384px",
  52: "416px",
  56: "448px",
  60: "480px",
  64: "512px",
  72: "576px",
  80: "640px",
  96: "768px",
};

export const appTheme = {
  ...defaultTheme,
  space,
};
