import apiHandler from '_server-utils/apiHandler'
import {
  getInventoryValuesByCategoryIds,
  getInventoryValuesByQuestionIds,
} from '_server-utils/prestApi'

export default apiHandler().get(async (req, res) => {
  const {
    query: { category_ids, question_ids, orderBy },
  } = req

  let result = []
  if (category_ids) {
    result = await getInventoryValuesByCategoryIds(category_ids, orderBy)
  } else {
    result = await getInventoryValuesByQuestionIds(question_ids, orderBy)
  }
  res.json(result)
})
