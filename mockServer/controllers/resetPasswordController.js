/* eslint-disable import/no-extraneous-dependencies */
import { json } from 'body-parser';
import { saveBitmasks } from '../../src/config/bitmasks';

export default function resetPasswordControllerFactory(app, delay) {
  app.use(json());
  app.post('/gb/uk/my_account_quick_account_password_reset/ajax.html', (req, res) => {
    setTimeout(() => {
      res.status(200)
        .send({
          status: 'OK',
          statusDetails: {
            successBitmask: saveBitmasks.RESET_PASSWORD,
            failureBitmask: 0
          },
          formSubmitFeedback: {
            [saveBitmasks.RESET_PASSWORD]: {
              formStatus: 'OK'
            }
          }
        });
    }, delay);
  });
}
