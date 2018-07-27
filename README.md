**Instalation**
```
> npm install
```

**Create build**
```
> npm run build
```

**Run locally**
```
> npm start
```

**Deploy on dev server**
```
> npm run deploy:dev
```
Will deploy current build to your dev server into ```/home/${user}/web_dir/ui-library/www/```. So you can then access it on http://${user}.ui-library.fo.dev.dixons.com/ You can specify the user if needed.
```
> npm run deploy:dev -- --user user01
```

**Run tests**
```
> npm test
```

**Run test coverage**
```
> npm run coverage
```

**Build HTML coverage report**
```
> npm run coverage; ./node_modules/.bin/nyc report --reporter=html
```

Then open your browser at <a href="http://localhost:3001/">localhost:3001</a> and enjoy.

**Every example is editable live!**

## Acceptance tests 

[CodeceptJS](http://codecept.io/) is used for acceptance tests. To run you have to download [selenium standalone driver](http://www.seleniumhq.org/). To run tests follow these steps:

```
Start ui-library server
> npm run start
Start Selenium server
> java -jar /path/to/selenium/driver.jar
Execute tests
> npm run test:acceptance
```

### Writing tests
```
Execute and fill propts:
> ./node_modules/.bin/codeceptjs gt
```

### Autocomplete

To autocomplete you can generate TypeScript definition file (it is ignored by git) by running:

```
> ./node_modules/.bin/codeceptjs def
```

***Storm** will find it and use this for autocomplete in JS tests.
