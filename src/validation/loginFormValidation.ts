import * as Yup from 'yup'

export default Yup.object().shape({
  username: Yup.string()
    .email('You must enter a valid username')
    .required('You must enter a username'),
  password: Yup.string().required('You must enter a password')
})
