import addresses from '../data/addresses.json';

export default function addressFinderControllerFactory(app) {
  app.get('/api/addresses/postcode/*', (req, res) => {
    res.status(200)
      .send(addresses);
  });
}
