// for server side api calls
const options = (method, body, token) => {
  const baseOpts = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  if (['GET', 'DELETE'].includes(method)) {
    return baseOpts
  }

  return { ...baseOpts, body: JSON.stringify(body) }
}

const api = (url, token = '') => {
  return {
    post: async (body, customOptions) => {
      const response = await fetch(
        url,
        customOptions || options('POST', body, token)
      )
      const jsonData = await response.json()
      return { ...jsonData, status: response.status }
    },
    get: async () => {
      const response = await fetch(url, options('GET', {}, token))
      return await response.json()
    },
    patch: async (body) => {
      const response = await fetch(url, options('PATCH', body, token))
      return await response.json()
    },
    put: async (body) => {
      const response = await fetch(url, options('PUT', body, token))
      return await response.json()
    },
    destroy: async () => {
      const response = await fetch(url, options('DELETE', null, token))
      if (response.status === 204) {
        return { message: 'Delete successfully' }
      }
      return await response.json()
    },
  }
}

export default api
