/* eslint-disable import/no-extraneous-dependencies */
import { json } from 'body-parser';
import { saveBitmasks } from '../../src/config/bitmasks';

export default function loginControllerFactory(app, delay) {
  app.use(json());
  app.post('/gb/uk/quick_account_sign_in*', (req, res) => {
    setTimeout(() => {
      res.status(200)
        .send({
          status: 'OK',
          statusDetails: {
            successBitmask: saveBitmasks.SIGN_IN,
            failureBitmask: 0,
            events: {
              [saveBitmasks.SIGN_IN]: ['full list']
            }
          },
          formSubmitFeedback: {
            [saveBitmasks.SIGN_IN]: {
              formStatus: 'OK',
              wishlistProductUrl: '/gbuk/s/my-account.html?lastProductId=2915--10162317'
            }
          }
        });
    }, delay);
  });
}
