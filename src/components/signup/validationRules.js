const nameRules = [
  name =>
    (name.length > 4 && name.length < 26) || 'At least 5 caracters, max 25',
  name =>
    /^[a-zA-Z0-9- ]+$/.test(name) || 'No special caracters allowed except - and space'
]

const passwordRules = [
  password =>
    (password.length > 5 && password.length < 26) ||
'At least 6 caracters, max 25'
]

const mailRules = [
  mail => !!mail || 'E-mail is required',
  mail => /.+@.+\..+/.test(mail) || 'E-mail must be valid',
  mail => (mail.length < 51 && mail.length > 0) || '50 caracters maximum'
]

export { nameRules, passwordRules, mailRules }
