import { Alert, Grid } from '@mui/material'
import styles from '@/styles/database/ErrorMessage.module.scss'

interface ErrorMessageProps {
  message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Grid className={styles.wrapper}>
      <Alert severity="error" className={styles.alert}>
        {message}
      </Alert>
    </Grid>
  )
}

export default ErrorMessage
