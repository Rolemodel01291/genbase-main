import { getInventories } from '_server-utils/prestApi'
import apiHandler from '_server-utils/apiHandler'

export default apiHandler().get(async (req, res) => {
  const inventories = await getInventories()
  res.json(inventories)
})
