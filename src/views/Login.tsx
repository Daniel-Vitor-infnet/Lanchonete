import { Grid, Box, TextField, Button, Typography, Tabs, Tab } from '@/libs/mui';
import { useState, useMemo } from 'react';
import stylesPerso from '@/styles/Login.module.scss';
import { iconSelect } from '@/utils/function';
import { MuiTelInput } from 'mui-tel-input'
import { ButtonPerson, AlertDiagConstruction } from '@/components';
import { useSettingsColors, useDatabaseStatusUI } from '@/hooks';
import { InterfaceSettingsColors } from '@/types';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

//const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar e-mail "@" e "."


export default function LoginDataBase() {

  // ¦  ========== [ Bancos de dados ] ==========

  const { data: settingsColorsBaseData, isLoading: settingsColorsLoading, error: settingsColorsError } = useSettingsColors({});

  const safeColors = settingsColorsBaseData ?? {}

  const hasSettingsColors = Object.keys(safeColors).length > 0



  const statuses = [
    { isLoading: settingsColorsLoading, error: settingsColorsError, isEmpty: !hasSettingsColors, emptyMsg: 'Sem cores' },
  ];

  const statusUI = useDatabaseStatusUI(statuses, 5000)



  if (statusUI) return <>{statusUI}</>


  return (
    <Login
      settingsColorsBaseData={safeColors}
    />
  )
}

interface LoginProps {
  settingsColorsBaseData: InterfaceSettingsColors;
}



const Login = ({ settingsColorsBaseData }: LoginProps) => {
  const [methods, setMethods] = useState<'phone' | 'email'>('phone');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alertDiagConstruction, setAlertDiagConstruction] = useState(false);

  const inputColor = "#FF6600";

  const textFieldStyles = useMemo(() => {
    const inputColor = "#FF6600";

    return {
      color: inputColor,
      "& .MuiInputBase-input": { color: inputColor },
      "& .MuiInputLabel-root": { color: inputColor },
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: inputColor },
        "&:hover fieldset": { borderColor: inputColor },
        "&.Mui-focused fieldset": { borderColor: inputColor },
        "&.Mui-focused": { color: inputColor }

      },
    };
  }, []);

  return (
    <Box className={stylesPerso["main_container"]}>
      <Typography className={stylesPerso["title"]}>
        Login
      </Typography>
      <Box className={stylesPerso["fields_container"]}>
        <Tabs
          value={methods}
          onChange={(_, m) => setMethods(m)}
          slotProps={{ indicator: { sx: { color: inputColor, backgroundColor: inputColor } } }}
          sx={{ ".MuiTab-root.Mui-selected": { color: inputColor } }}
        >
          <Tab label="Telefone" value="phone" icon={iconSelect({ iconInfo: "mui-contato-Phone", size: 1.3, colorData: "#4caf50" })} iconPosition="start" />
          <Tab label="Email" value="email" icon={iconSelect({ iconInfo: "mui-contato-Email", size: 1.3, colorData: "#E4405F" })} iconPosition="start" />
        </Tabs>

        {methods === 'phone'
          ? <MuiTelInput
            value={phone}
            onChange={(p: string) => setPhone(p)}
            onlyCountries={["BR", "AR", "VE", "CO", "PE", "CL", "PY", "UY"]}
            forceCallingCode defaultCountry="BR"
            sx={textFieldStyles}
          />
          : <TextField
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={stylesPerso["fields"]}
            sx={textFieldStyles}
          // error={!!email && !emailRegex.test(email)}
          // helperText={!!email && !emailRegex.test(email) ? "E-mail inválido" : ""}
          />
        }

        <TextField
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={stylesPerso["fields"]}
          sx={textFieldStyles}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          }}
        />


      </Box>

      <ButtonPerson
        colorsData={settingsColorsBaseData}
        className={stylesPerso["buttons_default"]}
        text="Fazer Login"
        disablePerson={(!email || !phone) && !password}
        onClick={() => setAlertDiagConstruction(true)}
      />

      {alertDiagConstruction && (
        <AlertDiagConstruction
          settingsColorsBaseData={settingsColorsBaseData}
          setOpenDialog={setAlertDiagConstruction}
        />
      )}
    </Box>
  );
}
