export interface Theme {
  _id: string;
  _type: "theme";
  title?: string;
  backgroundColor?: {
    hex: string;
    alpha?: number;
  };
  secondaryBackgroundColor?: {
    hex: string;
    alpha?: number;
  };
  thirdBackgroundColor?: {
    hex: string;
    alpha?: number;
  };
  textColor?: {
    hex: string;
    alpha?: number;
  };
  secondaryTextColor?: {
    hex: string;
    alpha?: number;
  };
  thirdTextColor?: {
    hex: string;
    alpha?: number;
  };
  accentColor?: {
    hex: string;
    alpha?: number;
  };
  secondaryAccentColor?: {
    hex: string;
    alpha?: number;
  };
  thirdAccentColor?: {
    hex: string;
    alpha?: number;
  };
}
