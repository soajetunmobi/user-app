import React, { FunctionComponent } from 'react'
import { Button, createStyles, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LoadingIndicator } from 'components/shared/LoadingIndicator'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: '450px',
      display: 'block',
      margin: '0 auto'
    },
    textField: {
      '& > *': {
        width: '100%'
      }
    },
    submitButton: {
      marginTop: '24px'
    },
    title: { textAlign: 'center' },
    successMessage: { color: 'green' },
    errorMessage: { color: 'red' }
  })
)

interface ProfileViewProps {
  user: User
  cancelView: () => void
  editContent: () => void
}

export const ProfileView: FunctionComponent<ProfileViewProps> = ({
  user,
  cancelView,
  editContent
}) => {
  const classes = useStyles()

  const renderAddress = () => {
    const { address } = user
    return (
      <div>
        <div>Street: {address.street}</div>
        <div>Town: {address.town}</div>
        <div>County: {address.county}</div>
        <div>Postcode: {address.postcode}</div>
      </div>
    )
  }
  const renderPreferences = () => {
    const {
      preferences: { contact }
    } = user
    return (
      <div>
        {contact.map((choice: preference) => {
          return <span key={choice}>{choice}</span>
        })}
      </div>
    )
  }

  if (!user) {
    return <LoadingIndicator />
  }

  return (
    <div className={classes.root} data-testid='profile-view'>
      <h1 className={classes.title}>Profile - View</h1>
      <Grid container justify='space-around' direction='row'>
        <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
          <span>Firstname:</span>
          <span data-testid='profile-firstname'>{user.first_name}</span>
        </Grid>
        <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
          <span>Other names:</span>
          <span data-testid='profile-othernames'>{user.other_names}</span>
        </Grid>
        <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
          <span>Address:</span>
          {renderAddress()}
        </Grid>
        <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
          <span>Mobile:</span>
          <span>{user.mobile}</span>
        </Grid>
        <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
          <span>Email:</span>
          <span>{user.mobile}</span>
        </Grid>
        <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
          <span>Company:</span>
          <span>{user.company}</span>
        </Grid>
        <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
          <span>Preferences:</span>
          {renderPreferences()}
        </Grid>
        <Grid item lg={10} md={10} sm={10} xs={10} className={classes.submitButton}>
          <Button
            type='submit'
            variant='outlined'
            color='secondary'
            data-testid='profile-cancel-button'
            onClick={cancelView}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='secondary'
            data-testid='profile-edit-button'
            onClick={editContent}
          >
            Edit
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
