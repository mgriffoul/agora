import {
  getUnavailableMailMessage,
  getUnavailableUsernameMessage,
  getServerErrorMessage,
  getInvalidMailOrPasswordMessage,
  getDefaultMessage
} from './message'

const messagesMap = [
  {
    api_error: 'MAIL_UNAVAILABLE',
    getter: getUnavailableMailMessage
  },
  {
    api_error: 'USERNAME_UNAVAILABLE',
    getter: getUnavailableUsernameMessage
  },
  {
    api_error: 'SERVER_ERROR',
    getter: getServerErrorMessage
  },
  {
    api_error: 'BAD_CREDENTIALS',
    getter: getInvalidMailOrPasswordMessage
  }
]

const getErrorMessage = (currentApiError, user) => {
  let errorMessage = ''
  messagesMap.forEach(message => {
    if (message.api_error === currentApiError) {
      errorMessage = message.getter(user)
    }
  })
  if (!errorMessage) {
    return getDefaultMessage()
  }
  return errorMessage
}

export default getErrorMessage
