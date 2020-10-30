import * as Yup from 'yup'

export default Yup.object().shape({
  firstname: Yup.string().required('You must enter first name'),
  othernames: Yup.string().required('You must enter other names'),
  street: Yup.string().required('You must enter a street for an address'),
  town: Yup.string().required('You must enter a town for an address'),
  county: Yup.string().required('You must enter a county for an address'),
  postcode: Yup.string().required('You must enter a post code for an address'),
  mobile: Yup.string().required('You must enter a mobile number'),
  email: Yup.string()
    .email('You must enter a valid email address')
    .required('You must enter a username'),
  company: Yup.string().required('You must enter a company name')
})
