const express = require('express')
const router = express.Router()
const pages = require('./pages')

pages.map(page => {
  router.get(page.location, (req, res, next) => {
    const p = page.page ? page.page : 'viz'
    res.render(p, { script: `/js/${page.file}.js`, style: `/css/${page.file}.css` })
  })
})

module.exports = router
