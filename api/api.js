const api = () => {
  const options = (method, body) => ({
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return {
    post: async (path, body) => {
      const response = await fetch(`/api/${path}`, options('POST', body))
      return await response.json()
    },
    get: async (path) => {
      const response = await fetch(`/api/${path}`, options('GET'))
      return await response.json()
    },
    patch: async (path, body) => {
      const response = await fetch(`/api/${path}`, options('PATCH', body))
      return await response.json()
    },
    delete: async (path) => {
      const response = await fetch(`/api/${path}`, options('DELETE'))
      return await response.json()
    },
  }
}

export default api
