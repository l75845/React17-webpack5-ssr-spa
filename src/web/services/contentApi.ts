import axios from 'axios';
import environment from '@environment';

export default () => {
  const returnData = new Promise((resolve, reject) => {
    axios
      .post(`${environment.API_URL}/api/getContentData`, {})
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return returnData;
};
