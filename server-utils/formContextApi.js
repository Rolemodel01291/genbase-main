import { getValuesBy, getCategoriesByInventoryId } from 'api/inventories'

const newFormValue = (keyId, form, inventoryId) => {
  const currentFieldValues = form.getFieldsValue()
  if (keyId.includes('groupedSelect')) {
    const currentGroupSelectValues = form.getFieldValue(keyId) || []
    return {
      ...currentFieldValues,
      [keyId]: [...currentGroupSelectValues, inventoryId],
    }
  }
  return { ...currentFieldValues, [keyId]: inventoryId }
}

const updateInventorySelection = async (_checked, inventoryId, keyId, form) => {
  const updatedFormValues = newFormValue(keyId, form, inventoryId)
  form.setFieldsValue(updatedFormValues)
  return new Promise((resolve) => resolve('success'))
}

export const apiFunctions = (formInstance) => ({
  getValuesBy,
  getCategoriesByInventoryId,
  getInventoriesByCategory: ({ filterValue }) =>
    getValuesBy({ filterValue, filterType: 'category' }),
  getDepartments: () =>
    new Promise((resolve) =>
      resolve([
        { id: 1, name: 'Department 1' },
        { id: 2, name: 'Department 2' },
      ])
    ),
  updateInventorySelection: (...params) =>
    updateInventorySelection(...params, formInstance),
})
