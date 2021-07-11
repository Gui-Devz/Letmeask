import { ReactNode, useState, useEffect, createContext } from "react";

type Theme = "light" | "dark";

/* type Themes = {
  dark: object,
  light: object
} */

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

type ThemeContextProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storagedTheme = localStorage.getItem("theme");

    return (storagedTheme ?? "light") as Theme;
  });

  /* const themes = {
    light:{
      themeBg: "#E2E2E2",
      asideBg: "#835AFD",
      textPgColor: "#29292E", 
      buttonAuthBg: "#ea4353",
      buttonAuthColor: "#fff",
      separatorColor: "#A8A8B3",
      textareaInputBg: "#fefefe",
      textareaInputColor: "#29292E",
      h1ContentColor: "#29292E",
      spanQuestionColor:"#737380",
      spanCodeColor: "#29292E",
      buttonEndroomBg: "#f8f8f8",
      buttonEndroomColor: "#835afd",
    },
    dark:{
      themeBg: "#212121",
      asideBg: "#343a40",
      textPgColor: "#fafafa", 
      buttonAuthBg: "#a8a8b3",
      buttonAuthColor: "#171717",
      separatorColor: "#424242",
      textareaInputBg: "#2e2e2e",
      textareaInputColor: "#e8f0f2",
      h1ContentColor: "#fafafa",
      spanQuestionColor:"#9e9e9e",
      spanCodeColor: "#fafafa",
      buttonEndroomBg: "#835afd",
      buttonEndroomColor: "#f8f8f8",
    }
  } */
  //const [themeProperties, setThemeProperties] = useState(themes[theme])

  /*  function settingThemeProperties(){
    const properties = Object.entries(themeProperties)
    properties.forEach(prop => {
      //document.documentElement.style.setProperty(prop[0], prop[1]);
      document.documentElement.style.setProperty(prop[0],prop[1])
    })
  } */

  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
      //setThemeProperties(themes.light)
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--themeBg", "#F8F8F8");
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--textareaInputColor", "#29292E");
    } else {
      setTheme("dark");
      //setThemeProperties(themes.dark)
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--themeBg", "#171717");
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--textareaInputColor", "#e8f0f2");
    }

    //settingThemeProperties();
  }

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--themeBg", "#171717");
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--textareaInputColor", "#e8f0f2");
    } else {
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--themeBg", "#F8F8F8");
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--textareaInputColor", "#29292E");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
