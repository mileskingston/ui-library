/* eslint-disable import/no-extraneous-dependencies */
import { json } from 'body-parser';
import { saveBitmasks } from '../../src/config/bitmasks';

const RECOGNIZED_EMAIL = 'recognize-me@gmail.com';

export default function emailRecognitionControllerFactory(app, delay) {
  app.use(json());
  app.post('/gb/uk/my_account/ajax.html', (req, res) => {
    if (parseInt(req.query.save, 10) !== saveBitmasks.EMAIL_RECOGNITION) {
      return;
    }

    const {
      [saveBitmasks.EMAIL_RECOGNITION]: {
        formData: {
          email
        }
      }
    } = req.body;

    setTimeout(() => {
      res.status(200)
        .send({
          status: 'OK',
          statusDetails: {
            successBitmask: saveBitmasks.EMAIL_RECOGNITION,
            failureBitmask: 0
          },
          formSubmitFeedback: {
            [saveBitmasks.EMAIL_RECOGNITION]: {
              emailRecognized: email === RECOGNIZED_EMAIL,
              firstName: email === RECOGNIZED_EMAIL
                ? 'John'
                : null,
              formStatus: 'OK'
            }
          }
        });
    }, delay);
  });
}
