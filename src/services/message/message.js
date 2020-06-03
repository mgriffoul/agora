export const getServerErrorMessage = () => 'Oups... Sorry. Server encountered a technical issue. Please try again.'
export const getInvalidMailOrPasswordMessage = () => 'Invalid mail or password'
export const getUnavailableMailMessage = (user) => `The address ${user.mail} is already assigned to an account.`
export const getUnavailableUsernameMessage = (user) => `The username ${user.username} is not available.`
export const getDefaultMessage = () => 'Sorry, but an unknown error has occurred... Please try again.'
