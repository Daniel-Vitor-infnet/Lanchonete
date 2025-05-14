import { CircularProgress, Grid } from '@mui/material'
import styles from '@/styles/database/Loading.module.scss'

const Loading = () => {
  return (
    <Grid className={styles.wrapper}>
      <CircularProgress className={styles.spinner} />
    </Grid>
  )
}

export default Loading
