import { createFormResponse } from '_server-utils/corpsecApi';
import apiHandler from '_server-utils/apiHandler';

export default apiHandler().post(async (req, res) => {
  const result = await createFormResponse(req.body);

  res.json(result);
});
