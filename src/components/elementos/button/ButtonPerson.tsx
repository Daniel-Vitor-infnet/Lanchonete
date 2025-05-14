import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { culoriCalc } from "@/utils/function";
import { InterfaceSettingsColors } from "@/types"



const defaultStyles = {
  width: "220px",
  height: "55px",
  background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  textTransform: "none",
  letterSpacing: "1.2px",
  border: "none",
  borderRadius: "12px",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)",
  transition: "all 0.3s ease-in-out",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",

  "&:hover": {
    background: "linear-gradient(135deg, #388E3C, #1B5E20)",
    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.35)",
    transform: "translateY(-2px)",
  },

  "&:active": {
    transform: "scale(0.96)",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
  },

  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "rgba(255, 255, 255, 0.2)",
    transition: "left 0.3s ease-in-out",
  },

  "&:hover::before": {
    left: "100%",
  },
};




type Props = {
  text: string;
  disablePerson?: boolean;
  colorsData?: InterfaceSettingsColors | string;
  admin?: boolean;
} & ButtonProps;

const ButtonPerson: React.FC<Props> = ({ text, disablePerson, colorsData, ...props }) => {

  const corButtom = typeof colorsData === "string" ? colorsData : colorsData?.["button"]?.value || "";;
  const buttonsDataBase = {
    background: corButtom,
    color: 'white',
    '&:hover': {
      background: `linear-gradient(135deg, ${culoriCalc({ keyColorData: corButtom!, calc: [-0.12, 0.02, -11.3] })}, ${culoriCalc({ keyColorData: corButtom!, calc: [0.13, -0.02, 59.34] })})`,
    },
  };


  return (
    <Button
      sx={{ ...defaultStyles, ...(!!colorsData ? buttonsDataBase : '') }}
      //sx={{ ...defaultStyles,  }}
      {...props}
      style={{
        ...(disablePerson && {
          opacity: 0.6,
          pointerEvents: 'none',
          cursor: 'not-allowed',
          backgroundColor: '#A7A7A7',
          color: '#292929',
          borderColor: '#bbb',
        }),
      }}
    >
      {text}
    </Button>
  );
};

export default ButtonPerson;
