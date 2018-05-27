const puppeteer = require('puppeteer')

class CoinboardScrapper {
  constructor(args) {
    this.email = args.email
    this.password = args.password
    this.currency = 'jpy'
  }

  async getTotalAssets (type) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    try {
      // Check type
      if (type) {
        if (type === 'jpy' || type === 'btc') {
          this.currency = type
        } else {
          throw new Error('Currency type must be jpy or btc')
        }
      }

      // Login
      await page.goto('https://coinboard.me/login/')
      await page.type('#id_username', this.email)
      await page.type('#id_password', this.password)
      await page.click('.secondary-button')
      await page.waitForNavigation({
        waitUntil: 'domcontentloaded'
      })

      // Update
      await page.goto('https://coinboard.me/home/update_request_done/')

      // Home
      await page.goto('https://coinboard.me/home/')

      // Change default currency

      await page.click('#jsi-default-quote-currency')

      let $selectableCurrencies = await page.$$('.jsc-selectable-quote-currency')
      let currentCurrency = await page.evaluate(() => document.querySelector('#jsi-default-quote-currency > span').innerText)

      if (this.currency !== currentCurrency.toLowerCase()) {
        switch (this.currency) {
          case 'jpy':
            $selectableCurrencies[0].click()
            break
          case 'btc':
            $selectableCurrencies[1].click()
            break
        }

        await page.waitForNavigation({
          waitUntil: 'domcontentloaded'
        })
      }

      // Get Total Assets
      let totalAssets = await page.evaluate(() => document.querySelector('.sg-total-assets-amount > b').innerText);

      // Close
      await browser.close()

      // Serialize
      switch (this.currency) {
        case 'jpy':
          totalAssets = totalAssets.replace(/,/g, '') - 0
          break
        case 'btc':
          totalAssets -= 0
          break
      }

      // Return
      return totalAssets
    } catch (e) {
      console.error(e)
      await browser.close()
      return e
    }
  }
}

module.exports = CoinboardScrapper
