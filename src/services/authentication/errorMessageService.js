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
  let payloadToDisplay = ''
  if (currentApiError === 'MAIL_UNAVAILABLE')payloadToDisplay = userInfos?.mail
  if (currentApiError === 'USERNAME_UNAVAILABLE')payloadToDisplay = userInfos?.username

  let errorMessage = messages.filter(
    (message) => message.api_error === currentApiError)
    .map(message => message.message)[0]

  if (errorMessage && errorMessage.includes('xxxxx')) {
    errorMessage = errorMessage.replace(/xxxxx/, payloadToDisplay)
  } else {
    errorMessage = defaultError
  }

  return errorMessage
}

export { getErrorMessage }
