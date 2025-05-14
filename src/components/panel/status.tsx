import * as React from 'react';
import { Box, TextField, MenuItem } from '@/libs/mui';
import { ButtonOnOff} from '@/components';



const status = [
  {
    value: '0',
    label: 'Fechado',
  },
  {
    value: '1',
    label: 'Aberto',
  }
];


export const Status: React.FC = () => {
  return (
    <ButtonOnOff optLeft={status[0].label} optRight={status[1].label} />
  );
}

export const StatusMobile: React.FC = () => {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          sx={{ width: '130px' }}
          select
          label="Estado"
          defaultValue="1"
        >
          {status.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

      </div>
    </Box>
  );
}



