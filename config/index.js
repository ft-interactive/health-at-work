import axios from 'axios';
import article from './article';
import getFlags from './flags';
import getOnwardJourney from './onward-journey';

export default async () => {
  const d = await article();
  const flags = await getFlags();
  const onwardJourney = await getOnwardJourney();
  const berthaId = '1ivmubf00UxNliNQhu4zVC9F_1BsfpOaVpSH6VKqW9cg';
  const endpoint = `http://bertha.ig.ft.com/view/publish/gss/${berthaId}/data`;
  let data;

  try {
    const res = await axios(endpoint);

    data = res.data;
  } catch (e) {
    console.log('Error getting content from Bertha', e);
  }

  return {
    ...d,
    flags,
    onwardJourney,
    data,
  };
};
