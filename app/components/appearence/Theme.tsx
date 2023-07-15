"use client";
import useColorScheme from "@/app/hooks/use-color-scheme";
import { useTheme } from "@/app/stores/site/hooks";
import React, { useEffect } from "react";

const Theme = () => {
  const theme = useTheme();
  const colorSchema = useColorScheme();

  useEffect(() => {
    if (theme === "system") {
      document.body.className = colorSchema;
    } else {
      document.body.className = theme;
    }
  }, [theme, colorSchema]);
  return <></>;
};

export default Theme;
