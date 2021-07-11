import apiHandler from '_server-utils/apiHandler'
import {
  getInventoryCategoriesByInventoryId,
  getInventoryCategoriesByQuestionIds,
  getInventoryValuesByCategoryIds,
} from '_server-utils/prestApi'
import { groupBy } from '_server-utils/utils'

export default apiHandler().get(async (req, res) => {
  const {
    query: { inventory_id, question_id },
  } = req

  let result = []
  if (inventory_id) {
    result = await getInventoryCategoriesByInventoryId(inventory_id)
  } else if (question_id) {
    result = await getInventoryCategoriesByQuestionIds(question_id)
  }

  let values
  if (result.length > 0) {
    values = await getInventoryValuesByCategoryIds(
      result.map((category) => category.id)
    )
  }

  const groupedValues = groupBy(values, 'cat_id')
  const categories = result.map((category) => ({
    ...category,
    values: groupedValues[category.id.toString()] || [],
  }))

  res.json(categories)
})
