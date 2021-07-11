import api from '_server-utils/api';

const CORPSEC_API_URL = process.env.CORPSEC_API_URL;

const get = (path, token) => api(`${CORPSEC_API_URL}${path}`, token).get();
const post = (path, payload, token, customOptions) =>
  api(`${CORPSEC_API_URL}${path}`, token).post(payload, customOptions);
const patch = (path, payload, token) => api(`${CORPSEC_API_URL}${path}`, token).patch(payload);
const put = (path, payload, token) => api(`${CORPSEC_API_URL}${path}`, token).put(payload);
const destroy = (path, token) => api(`${CORPSEC_API_URL}${path}`, token).destroy();

/**
 * Activities
 */

export const getActivities = async () => get('activities/');

export const getActivity = async (id) => get(`activities/?id=${id}`);

/**
 * Activity Response
 */
export const getFormResponse = async (id) => get(`responses/?id=${id}`);

export const createFormResponse = async (payload) => post('responses/', payload);

export const updateFormResponse = async (id, payload) => patch(`responses/?id=${id}`, payload);
