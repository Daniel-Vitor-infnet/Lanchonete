import React, { useState } from 'react';
import { Grid, Box, Select, MenuItem, Button, Typography } from '@/libs/mui';
import { mixins } from '@/components';

const TimeSelectPerso: React.FC = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const gridStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: "40px",
    gap: "10px",

    [mixins.mobileLarge]: {
      flexDirection: "column",
      maxHeight: "unset",
      gap: "5px"
    },
  };

  const selectStyles = {
    maxHeight: "40px",
    maxWidth: "80px",
  };

  return (
    <Grid sx={gridStyles} >
      <Select sx={selectStyles} value={hours} onChange={(e) => setHours(Number(e.target.value))} MenuProps={{ PaperProps: { style: { maxHeight: 224 } }, disableScrollLock: true }}>
        {[...Array(24).keys()].map((h) => (
          <MenuItem key={h} value={h}>{`${h}h`}</MenuItem>
        ))}
      </Select>
      <Select sx={selectStyles} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} MenuProps={{ PaperProps: { style: { maxHeight: 224 } }, disableScrollLock: true }}>
        {[...Array(60).keys()].map((m) => (
          <MenuItem key={m} value={m}>{`${m}m`}</MenuItem>
        ))}
      </Select>
      <Select sx={selectStyles} value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} MenuProps={{ PaperProps: { style: { maxHeight: 224 } }, disableScrollLock: true }}>
        {[...Array(60).keys()].map((s) => (
          <MenuItem key={s} value={s}>{`${s}s`}</MenuItem>
        ))}
      </Select>
    </Grid >
  );
};

export default TimeSelectPerso;
