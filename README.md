# coinboard-scrapper

A scraping module of [coinboard.me](https://coinboard.me/)

## Usage

### Install module from npm

```bash
$ npm install coinboard-scrapper
```

### Example

```js
const CoinboardScrapper = require('coinboard-scrapper')

const cbs = new CoinboardScrapper({
  email: 'hello@example.com',
  password: 'yourpassword'
})


cbs.getTotalAssets('jpy').then((result) => {
  console.log(result)
})
```
