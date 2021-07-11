import api from './api'

export const getForm = (id) => api().get(`activities/${id}`)

export const getFormResponse = (id) => api().get(`form_responses/${id}`)

export const createFormResponse = (params) =>
  api().post(`form_responses`, params)

export const updateFormResponse = (id, params) =>
  api().patch(`form_responses/${id}`, params)
