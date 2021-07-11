import nc from 'next-connect'

const apiHandler = () =>
  nc({
    onNoMatch(req, res) {
      res.status(404).json({ error: 'unknown operation' })
    },
    onError(err, req, res) {
      res.status(500).json({ error: err.toString() })
    },
  })

export default apiHandler
