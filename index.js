var fs = require('fs')
var QrCode = require('qrcode-reader')
var QrcodeTerminal = require('qrcode-terminal')
var Jimp = require("jimp")
var puppeteer = require("puppeteer")

var wxjs = fs.readFileSync('wx.js', 'utf-8')

puppeteer.launch().then(browser => {
  browser.newPage().then(page => {
    page.on('console', msg => console.log(msg.text))
    page.goto('https://wx2.qq.com/').then(response => {
      page.evaluate(wxjs => {
        window.eval(wxjs)
        window.wxEval.init()
        var login = angular.element('.login').scope()
        return {
          uuid: login.uuid,
          isAssociationLogin: login.isAssociationLogin
        }
      }, wxjs).then(res => {
        var url = 'https://login.weixin.qq.com/l/'+res.uuid
        QrcodeTerminal.generate(url)
      })
    })
  })
})
