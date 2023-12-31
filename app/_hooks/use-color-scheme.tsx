import { useEffect, useState } from "react";

export default function useColorScheme() {
  const [colorScheme, setColorScheme] = useState("light");

  useEffect(() => {
    if (window.matchMedia) {
      const colorSchemeQueryList = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      const changeHandler = (evt: any) => {
        const newColorScheme = evt.matches ? "dark" : "light";
        setColorScheme(newColorScheme);
      };
      colorSchemeQueryList.addEventListener("change", changeHandler);
      changeHandler(colorSchemeQueryList);
    }
  }, []);

  return colorScheme;
}
