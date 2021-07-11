import { getActivity } from '_server-utils/corpsecApi';
import apiHandler from '_server-utils/apiHandler';

export default apiHandler().get(async (req, res) => {
  const {
    query: { id }
  } = req;
  const activity = await getActivity(id);
  res.json(activity[0]);
});
