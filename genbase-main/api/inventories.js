import api from './api'

export const getInventories = () => api().get('inventories')

export const getCategoriesByInventoryId = (formId, keyId) =>
  api().get(`inventories/categories?form_id=${formId}&key_id=${keyId}`)

export const getValues = () => api().get('values')

export const getValuesBy = ({ filterType, filterValue, orderBy }) => {
  if (filterType === 'category') {
    if (orderBy) {
      return api().get(
        `inventories/values?category_ids=${filterValue}&orderBy=${orderBy}`
      )
    }
    return api().get(`inventories/values?category_ids=${filterValue}`)
  }
  if (orderBy) {
    return api().get(
      `inventories/values?question_ids=${filterValue}&orderBy=${orderBy}`
    )
  }
  return api().get(`inventories/values?question_ids=${filterValue}`)
}
