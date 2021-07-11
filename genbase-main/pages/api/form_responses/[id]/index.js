import { getFormResponse, updateFormResponse } from '_server-utils/corpsecApi';
import apiHandler from '_server-utils/apiHandler';

export default apiHandler()
  .get(async (req, res) => {
    const {
      query: { id }
    } = req;
    const fResponses = await getFormResponse(id);
    res.json(fResponses[0]);
  })
  .patch(async (req, res) => {
    const {
      query: { id }
    } = req;
    const result = await updateFormResponse(id, req.body);

    res.json(result);
  });
