import { getActivities } from '_server-utils/corpsecApi';
import apiHandler from '_server-utils/apiHandler';

export default apiHandler().get(async (req, res) => {
  const activities = await getActivities();
  res.json(activities);
});
