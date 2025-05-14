import React, { useState } from 'react';
import styles from '@/styles/Login.module.scss';
import { Grid, Box, TextField, Button, Typography, Tabs, Tab, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl } from '@/libs/mui';
import { AlertDiagPers } from '@/components';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Login: React.FC = () => {
  const [state, setState] = useState({
    loginMethod: 'email',
    identifier: '',
    password: '',
    showPassword: false,
    screen: 'login',
  });

  const handleChange = (key: string, value: string | boolean) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return (
      <Grid className={styles['main-container']}>
        <AlertDiagPers message={"Ainda não foi adicionado sistema de criação de contas"} />
        <Box className={styles['box']}>
          {state.screen === 'login' && (
            <>
              <Typography variant="h5" gutterBottom align="center">
                Login
              </Typography>
              <Tabs
                value={state.loginMethod}
                onChange={(e, newValue: 'email' | 'phone') => handleChange('loginMethod', newValue)}
                variant="fullWidth"
              >
                <Tab label="Email" value="email" />
                <Tab label="Telefone" value="phone" />
              </Tabs>
              {/* {state.loginMethod === 'phone' ? (
              <MuiTelInput
                value={state.identifier}
                onChange={(value: string) => handleChange('identifier', value)}
                defaultCountry="BR"
                label="Telefone"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            ) : (
              <TextField
                required
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={state.identifier}
                onChange={(e) => handleChange('identifier', e.target.value)}
              />
            )} */}
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel htmlFor="password">Senha</InputLabel>
                <OutlinedInput
                  required
                  id="password"
                  type={state.showPassword ? 'text' : 'password'}
                  value={state.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={state.showPassword ? 'Esconder senha' : 'Mostrar senha'}
                        onClick={() => handleChange('showPassword', !state.showPassword)}
                        edge="end"
                      >
                        {state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Senha"
                />
              </FormControl>
              <Typography onClick={() => handleChange('screen', 'register')} className={styles['link']}>
                Criar conta
              </Typography>
              <Typography onClick={() => handleChange('screen', 'forgotPassword')} className={styles['link']}>
                Esqueceu a senha?
              </Typography>
              <Button variant="contained" color="primary" fullWidth className={styles['button']}>
                Entrar
              </Button>
            </>
          )}
          {state.screen === 'register' && (
            <>
              <Typography variant="h5" gutterBottom align="center">Criar Conta</Typography>
              <TextField required label="Nome" variant="outlined" fullWidth margin="normal" />
              {/* <MuiTelInput value={state.identifier} onChange={(value: string) => handleChange('identifier', value)} defaultCountry="BR" label="Telefone" variant="outlined" fullWidth margin="normal" /> */}
              <TextField required label="Email" variant="outlined" fullWidth margin="normal" />
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel htmlFor="register-password">Senha</InputLabel>
                <OutlinedInput
                  required
                  id="register-password"
                  type={state.showPassword ? 'text' : 'password'}
                  value={state.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={state.showPassword ? 'Esconder senha' : 'Mostrar senha'}
                        onClick={() => handleChange('showPassword', !state.showPassword)}
                        edge="end"
                      >
                        {state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Senha"
                />
              </FormControl>
              <Button variant="contained" color="primary" fullWidth className={styles['button']}>Cadastrar</Button>
              <Typography onClick={() => handleChange('screen', 'login')} className={styles['link']}>Já tem uma conta? Faça login</Typography>
            </>
          )}
          {state.screen === 'code' && (
            <>
              <Typography variant="h5" gutterBottom align="center">
                Código de recuperação
              </Typography>
              <TextField required label="Código" variant="outlined" fullWidth margin="normal" />
              <Button variant="contained" color="primary" fullWidth className={styles['button']}>
                Enviar Código
              </Button>
              <Typography onClick={() => handleChange('screen', 'forgotPassword')} className={styles['link']}>
                Voltar para Recuperar Senha
              </Typography>
              <Typography onClick={() => handleChange('screen', 'login')} className={styles['link']}>
                Voltar para o login
              </Typography>
            </>
          )}
          {state.screen === 'forgotPassword' && (
            <>
              <Typography variant="h5" gutterBottom align="center">
                Recuperar Senha
              </Typography>
              <TextField required label="Email" variant="outlined" fullWidth margin="normal" />
              <Button variant="contained" color="primary" fullWidth className={styles['button']}>
                Enviar Código de Recuperação
              </Button>
              <Typography onClick={() => handleChange('screen', 'login')} className={styles['link']}>
                Voltar para o login
              </Typography>
              <Typography onClick={() => handleChange('screen', 'code')} className={styles['link']}>
                Confirmar Código de Recuperação
              </Typography>
            </>
          )}
        </Box>
      </Grid>
  );
};

export default Login;