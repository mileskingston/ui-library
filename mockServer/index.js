import addressFinderControllerFactory from './controllers/addressFinderController';
import emailRecognitionControllerFactory from './controllers/emailRecognitionController';
import loginControllerFactory from './controllers/loginController';
import registrationControllerFactory from './controllers/registrationController';
import resetPasswordControllerFactory from './controllers/resetPasswordController';

export default function mockServer(app) {
  // Throttle middleware
  app.use((req, res, next) => {
    if (req.query.throttle) {
      // eslint-disable-next-line no-console
      console.log(`Throttling request for ${req.query.throttle} ms`);
      setTimeout(next, req.query.throttle);
    } else {
      next();
    }
  });

  addressFinderControllerFactory(app, 1000);
  emailRecognitionControllerFactory(app, 1000);
  loginControllerFactory(app, 1000);
  registrationControllerFactory(app, 1000);
  resetPasswordControllerFactory(app, 1000);
}
