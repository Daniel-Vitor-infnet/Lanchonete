import { Alert, Grid } from '@mui/material'
import styles from '@/styles/database/EmptyMessage.module.scss'

interface EmptyMessageProps {
  message: string | null | undefined
}

const EmptyMessage = ({ message }: EmptyMessageProps) => {
  return (
    <Grid className={styles.wrapper}>
      <Alert severity="info" variant="outlined" className={styles.alert}>
        {message}
      </Alert>
    </Grid>
  )
}

export default EmptyMessage
