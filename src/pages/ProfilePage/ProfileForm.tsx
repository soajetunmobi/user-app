import React, { FunctionComponent, useState } from 'react'
import { Button, createStyles, Grid, TextField } from '@material-ui/core'
import { Field, Form, Formik, FormikProps } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import { LoadingIndicator } from 'components/shared/LoadingIndicator'
import { profileFormValidation } from 'validation'
import { useUserContext } from 'providers'

interface IProfileForm {
  firstname: string
  othernames: string
  street: string
  town: string
  county: string
  postcode: string
  mobile: string
  email: string
  company: string
  preferences: string[]
}

const formStatusProps: IFormStatusProps = {
  success: {
    message: 'Profile update successful.',
    type: 'success'
  },
  fail: {
    message: 'Profile update failed',
    type: 'error'
  },
  error: {
    message: 'Something went wrong. Please try again.',
    type: 'error'
  }
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: '700px',
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

interface ProfileFormProps {
  user: User
  cancelEdit: () => void
}

export const ProfileForm: FunctionComponent<ProfileFormProps> = ({ user, cancelEdit }) => {
  const classes = useStyles()
  const { setUser } = useUserContext()
  const [displayFormStatus, setDisplayFormStatus] = useState(false)
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: '',
    type: ''
  })

  const initialValue = {
    firstname: user.first_name,
    othernames: user.other_names,
    street: user.address.street,
    town: user.address.town,
    county: user.address.county,
    postcode: user.address.postcode,
    mobile: user.mobile,
    email: user.email,
    company: user.company,
    preferences: [...user.preferences.contact]
  }

  const saveProfileUpdate = async (data: IProfileForm) => {
    const updatedUser = {
      id: user.id,
      first_name: data.firstname,
      other_names: data.othernames,
      address: {
        street: data.street,
        town: data.town,
        county: data.county,
        postcode: data.postcode
      },
      mobile: data.mobile,
      email: data.email,
      company: data.company,
      preferences: {
        contact: [...data.preferences]
      }
    }
    try {
      setFormStatus(formStatusProps.success)
      setUser(updatedUser)
      cancelEdit()
    } catch (err) {
      setFormStatus(formStatusProps.fail)
    }

    setDisplayFormStatus(true)
  }

  if (!user) {
    return <LoadingIndicator />
  }

  return (
    <div className={classes.root} data-testid='profile-edit'>
      <Formik
        initialValues={initialValue}
        onSubmit={async (values: IProfileForm, actions) => {
          await saveProfileUpdate(values)
          setTimeout(() => {
            actions.setSubmitting(false)
          })
        }}
        validationSchema={profileFormValidation}
      >
        {(props: FormikProps<IProfileForm>) => {
          const { values, touched, errors, handleBlur, handleChange, isSubmitting } = props
          return (
            <Form>
              <h1 className={classes.title}>Profile - Edit</h1>
              <Grid container justify='space-around' direction='row'>
                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
                  <TextField
                    name='firstname'
                    id='firstname'
                    label='First name'
                    value={values.firstname}
                    type='text'
                    helperText={
                      errors.firstname && touched.firstname ? errors.firstname : 'Enter firstname'
                    }
                    error={errors.firstname && touched.firstname ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
                  <TextField
                    name='othernames'
                    id='othernames'
                    label='Other names'
                    value={values.othernames}
                    type='text'
                    helperText={
                      errors.othernames && touched.othernames
                        ? errors.othernames
                        : 'Enter other names'
                    }
                    error={errors.othernames && touched.othernames ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
                  <TextField
                    name='street'
                    id='street'
                    label='Street'
                    value={values.street}
                    type='text'
                    helperText={errors.street && touched.street ? errors.street : 'Enter street'}
                    error={errors.street && touched.street ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
                  <TextField
                    name='town'
                    id='town'
                    label='Town'
                    value={values.town}
                    type='text'
                    helperText={errors.town && touched.town ? errors.town : 'Enter town'}
                    error={errors.town && touched.town ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
                  <TextField
                    name='county'
                    id='county'
                    label='County'
                    value={values.county}
                    type='text'
                    helperText={errors.county && touched.county ? errors.county : 'Enter county'}
                    error={errors.county && touched.county ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
                  <TextField
                    name='postcode'
                    id='postcode'
                    label='Postcode'
                    value={values.postcode}
                    type='text'
                    helperText={
                      errors.postcode && touched.postcode ? errors.postcode : 'Enter postcode'
                    }
                    error={errors.postcode && touched.postcode ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
                  <TextField
                    name='mobile'
                    id='mobile'
                    label='Mobile'
                    value={values.mobile}
                    type='text'
                    helperText={errors.mobile && touched.mobile ? errors.mobile : 'Enter mobile'}
                    error={errors.mobile && touched.mobile ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
                  <TextField
                    name='email'
                    id='email'
                    label='Email'
                    value={values.email}
                    disabled={true}
                    type='email'
                    helperText={errors.email && touched.email ? errors.email : 'Enter email'}
                    error={errors.email && touched.email ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
                  <TextField
                    name='company'
                    id='company'
                    label='Company'
                    value={values.company}
                    type='text'
                    helperText={
                      errors.company && touched.company ? errors.company : 'Enter company'
                    }
                    error={errors.company && touched.company ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
                  <div role='group' aria-labelledby='checkbox-group'>
                    <label>
                      <Field type='checkbox' name='preferences' value='sms' />
                      SMS
                    </label>
                    <label>
                      <Field type='checkbox' name='preferences' value='mail' />
                      Mail
                    </label>
                    <label>
                      <Field type='checkbox' name='preferences' value='email' />
                      Email
                    </label>
                  </div>
                </Grid>
                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.submitButton}>
                  <Button
                    type='reset'
                    variant='outlined'
                    color='secondary'
                    data-testid='profile-cancel-button'
                    onClick={cancelEdit}
                  >
                    Cancel
                  </Button>
                  <Button
                    type='submit'
                    variant='contained'
                    color='secondary'
                    disabled={isSubmitting}
                  >
                    Save
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
