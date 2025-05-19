import { CircularProgress, Grid } from '@mui/material'
import styles from '@/styles/database/Loading.module.scss'

export default function Loading() {
  return (
    <Grid className={styles.wrapper}>
      <CircularProgress className={styles.spinner} />
    </Grid>
  )
}
