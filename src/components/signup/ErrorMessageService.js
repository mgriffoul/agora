const messages = [
  {
    api_error: 'MAIL_UNAVAILABLE',
    message: "L'adresse mail xxxxx est déjà associée à un compte. Vous devez en choisir une autre."
  },
  {
    api_error: 'USERNAME_UNAVAILABLE',
    message: "Le nom d'utilisateur xxxxx est déjà pris. Vous devez en choisir un autre."
  },
  {
    api_error: 'ERROR : database temporarily unavailable',
    message: 'Oups... Désolé. Un problème technique est survenu, veuillez réessayer ultérieurement.'
  }
]

const defaultError = "Désolé, une erreur inconnue s'est produite..."

const getErrorMessage = (currentApiError, userInfos) => {
  console.log('in service ' + currentApiError)
  let userInfo = ''
  if (currentApiError === 'MAIL_UNAVAILABLE')userInfo = userInfos?.mail
  if (currentApiError === 'USERNAME_UNAVAILABLE')userInfo = userInfos?.username

  let errorMessage = messages.filter(
    (message) => message.api_error === currentApiError)
    .map(message => message.message)[0]

  console.log('entre deux  ::::: ' + errorMessage)

  if (errorMessage && errorMessage.includes('xxxxx')) {
    console.log('if is true  + user info ' + userInfo)
    errorMessage = errorMessage.replace(/xxxxx/, userInfo)
  } else {
    errorMessage = defaultError
  }
  console.log('après --------- ' + errorMessage)
  return errorMessage
}

export { getErrorMessage }
