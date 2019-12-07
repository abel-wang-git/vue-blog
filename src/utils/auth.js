
const TokenKey = 'vue_admin_template_token'
const nameKey = 'vue_admin_template_name'

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

export function getName() {
  return sessionStorage.getItem(nameKey)
}

export function setName(name) {
  return sessionStorage.setItem(nameKey, name)
}
export function removeName() {
  return sessionStorage.removeItem(nameKey)
}
