export const signup = (user) => {
  return $.ajax({
    type: 'POST',
    url: 'api/users',
    data: { user }
  })
}


export const login = (user) => {
  return $.ajax({
    type: 'POST',
    url: 'api/sessions',
    data: { user }
  })
}

export const logout = (user) => {
  return $.ajax({
    type: 'POST',
    url: 'api/sessions',
    data: { user }
  })
}
