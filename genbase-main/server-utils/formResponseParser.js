import moment from 'moment'
import isEmpty from 'lodash/isEmpty'

export const parseFormResponse = (formResponse) =>
  Object.keys(formResponse).reduce((acc, responseKey) => {
    const responseValue = formResponse[responseKey]

    if (responseKey.includes('group') || responseKey.includes('Multi')) {
      return {
        ...acc,
        [responseKey]: isEmpty(responseValue)
          ? undefined
          : JSON.parse(responseValue),
      }
    }

    if (responseKey.includes('datetime') || responseKey.includes('date')) {
      return {
        ...acc,
        [responseKey]: moment(responseValue),
      }
    }

    return { ...acc, [responseKey]: responseValue }
  }, {})
