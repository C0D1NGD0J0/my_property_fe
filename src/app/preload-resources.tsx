"use client";
import ReactDOM from "react-dom";

export function PreloadResources() {
  ReactDOM.preload("https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css", {
    as: "style",
  });

  return null;
}
