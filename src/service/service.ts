import users from 'data/dummy-data.json'

export const userService = {
  getByEmail
}

function getByEmail(email: string): User | undefined {
  const user = users.users.find(user => user.email === email)
  console.log(user)

  return user
}
