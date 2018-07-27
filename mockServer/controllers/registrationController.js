/* eslint-disable import/no-extraneous-dependencies */
import { json } from 'body-parser';
import { saveBitmasks } from '../../src/config/bitmasks';

export default function registrationControllerFactory(app, delay) {
  app.use(json());
  app.post('/gb/uk/quick_account_creation*', (req, res) => {
    setTimeout(() => {
      res.status(200)
        .send({
          status: 'OK',
          statusDetails: {
            successBitmask: saveBitmasks.REGISTRATION,
            failureBitmask: 0
          },
          formSubmitFeedback: {
            [saveBitmasks.REGISTRATION]: {
              formStatus: 'OK'
            }
          }
        });
    }, delay);
  });
}
