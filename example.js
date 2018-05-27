const CoinboardScrapper = require('./')

require('dotenv').config()

const cbs = new CoinboardScrapper({
  email: process.env.EMAIL,
  password: process.env.PASSWORD
})


cbs.getTotalAssets('jpy').then((result) => {
  console.log(result)
})
