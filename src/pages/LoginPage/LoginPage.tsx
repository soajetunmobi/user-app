import React, { FunctionComponent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Formik, FormikProps } from 'formik'
import { userService } from 'service'
import { routes } from 'const/routes'
import { loginFormValidation } from 'validation'
import { Button, createStyles, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useUserContext } from '../../providers'

interface ILoginForm {
  username: string
  password: string
}

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

const formStatusProps: IFormStatusProps = {
  success: {
    message: 'Logged in successfully. You will be redirected to home page',
    type: 'success'
  },
  fail: {
    message: 'Incorrect username or password.',
    type: 'error'
  },
  error: {
    message: 'Something went wrong. Please try again.',
    type: 'error'
  }
}

const LOGIN_INITIAL_VALUES = {
  username: '',
  password: ''
}

export const LoginPage: FunctionComponent = () => {
  const { setUser } = useUserContext()
  const classes = useStyles()
  const history = useHistory()
  const [displayFormStatus, setDisplayFormStatus] = useState(false)
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: '',
    type: ''
  })

  const authenticateUser = async ({ username, password }: ILoginForm) => {
    const loggedInUser = await userService.getByEmail(username)
    if (
      loggedInUser &&
      loggedInUser.email.toLowerCase() === username.toLowerCase() &&
      password.length !== 0
    ) {
      setFormStatus(formStatusProps.success)
      setUser(loggedInUser)
      setTimeout(() => history.push(routes.home), 5000)
    } else {
      setFormStatus(formStatusProps.fail)
    }
    setDisplayFormStatus(true)
  }

  return (
    <div className={classes.root}>
      <Formik
        initialValues={LOGIN_INITIAL_VALUES}
        onSubmit={async (values: ILoginForm, actions) => {
          await authenticateUser(values)
          setTimeout(() => {
            actions.setSubmitting(false)
          })
        }}
        validationSchema={loginFormValidation}
      >
        {(props: FormikProps<ILoginForm>) => {
          const { values, touched, errors, handleBlur, handleChange, isSubmitting } = props
          return (
            <Form data-testid='login-form'>
              <h1 className={classes.title}>Login up</h1>
              <Grid container justify='space-around' direction='row'>
                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
                  <TextField
                    name='username'
                    id='username'
                    label='Username'
                    value={values.username}
                    type='email'
                    helperText={
                      errors.username && touched.username ? errors.username : 'Enter username'
                    }
                    error={errors.username && touched.username ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
                  <TextField
                    name='password'
                    id='password'
                    label='Password'
                    value={values.password}
                    type='password'
                    helperText={
                      errors.password && touched.password ? errors.password : 'Enter password'
                    }
                    error={errors.password && touched.password ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.submitButton}>
                  <Button
                    type='submit'
                    variant='contained'
                    color='secondary'
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                  {displayFormStatus && (
                    <div className='formStatus'>
                      {formStatus.type === 'error' ? (
                        <p className={classes.errorMessage}>{formStatus.message}</p>
                      ) : formStatus.type === 'success' ? (
                        <p className={classes.successMessage}>{formStatus.message}</p>
                      ) : null}
                    </div>
                  )}
                </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
