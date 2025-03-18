import React from "react";
import { ThumbnailPreviewProps } from "./Types";

const ThumbnailPreview = (props: ThumbnailPreviewProps) => {
  const bg = props.backgroundColor?.hex || "#ffffff";
  const text = props.textColor?.hex || "#0145A1";
  const accent = props.accentColor?.hex || "#AC9D80";

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <div style={{ backgroundColor: bg, flex: 1 }} />
      <div style={{ backgroundColor: text, flex: 1 }} />
      <div style={{ backgroundColor: accent, flex: 1 }} />
    </div>
  );
};

export default ThumbnailPreview;
