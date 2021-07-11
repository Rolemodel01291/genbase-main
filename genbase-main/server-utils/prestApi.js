import api from './api';
import prestUrlHelper from '_server-utils/prestUrlHelper';

const PREST_API_URL = process.env.PREST_API_URL;
const PREST_BATCH_API_URL = process.env.PREST_BATCH_API_URL;
const TOKEN = process.env.PREST_TOKEN;

const get = (path) => api(`${PREST_API_URL}${path}`, TOKEN).get();
const destroy = (path) => api(`${PREST_API_URL}${path}`, TOKEN).destroy();
const post = (path, payload) => api(`${PREST_API_URL}${path}`, TOKEN).post(payload);
const patch = (path, payload) => api(`${PREST_API_URL}${path}`, TOKEN).patch(payload);
const batch = (path, payload) => api(`${PREST_BATCH_API_URL}${path}`, TOKEN).post(payload);

/**
 * Inventories
 */
export const getInventories = async (orderBy = 'id') =>
  get(`inventories_inventory?_order=${orderBy}`);

export const getInventoryValuesByCategoryIds = async (categoryIds = [], orderBy = 'order') =>
  get(`inventories_intvalue?cat_id=$in.${categoryIds}&_order=inventories_intvalue.${orderBy}`);

export const getInventoryValuesByQuestionIds = async (questionIds = [], orderBy = 'order') => {
  const tableName = 'inventories_intvalue';
  const joinTable = 'inventories_intcat';
  const joinStat = `inner:${joinTable}:${tableName}.cat_id:$eq:${joinTable}.id`;
  const selectStat = `${tableName}.id,cat_id,question_id,value`;
  const orderStat = `inventories_intvalue.${orderBy}`;

  let url = prestUrlHelper({
    tableName,
    joinStat,
    orderStat,
    selectStat
  });

  if (questionIds.length > 0) {
    url += `&question_id=$in.${questionIds}`;
  }

  return get(`${url}&company_id=$null`);
};

export const getInventoryCategoriesByInventoryId = async (inventoryId, orderBy = 'order') => {
  const tableName = 'inventories_intcat';
  const joinTable = 'inventories_intquestion';
  const joinStat = `inner:${joinTable}:${tableName}.question_id:$eq:${joinTable}.id`;
  const selectStat = `${tableName}.id,question_id,inventory_id,${tableName}.name`;
  const orderStat = `${tableName}.${orderBy}`;

  let url = prestUrlHelper({
    tableName,
    joinStat,
    selectStat,
    orderStat
  });

  if (inventoryId) {
    url += `&inventory_id=${inventoryId}`;
  }

  return get(url);
};

export const getInventoryCategoriesByQuestionIds = async (questionIds, orderBy = 'order') =>
  get(`inventories_intcat?_order=${orderBy}&question_id=$in.${questionIds}&deleted=$nottrue`);
