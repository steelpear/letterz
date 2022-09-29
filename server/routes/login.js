const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Login = require('../models/Login')

router.get('/', async (req, res) => {
  res.json(await Login.find())
})

router.post('/new', async (req, res) => {
  const record = new Login({
    login: req.body.login,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role
  })
  await record.save()
  res.json({ state: 'success' })
})

// router.put('/', async (req, res) => {
//   await Login.updateMany({
//     login: req.body.login,
//     password: bcrypt.hashSync(req.body.password, 8),
//     role: req.body.role
//   })
//   res.json({ state: 'updated' })
// })

router.delete('/delete/:id', async (req, res) => {
  await Login.findByIdAndRemove(req.params.id)
  res.json({ state: 'Аккаунт удалён' })
})

router.post('/update', async (req, res) => {
  const dat = req.body.data
  let data = null
  if (dat.password && dat.role) {
    data = { password: bcrypt.hashSync(dat.password, 8), role: dat.role }
  } else if (dat.password && !dat.role) {
    data = { password: bcrypt.hashSync(dat.password, 8) }
  } else if (!dat.password && dat.role) {
    data = { role: dat.role }
  } else { return res.json({ state: 'Ошибка!' }) }
  await Login.findByIdAndUpdate(req.body.id, data)
  res.json({ state: 'Аккаунт изменён' })
})

router.post('/', async (req, res) => {
  let passwordIsValid = false
  const logindata = await Login.find()
  logindata.forEach(function (item, i, logindata) {
    passwordIsValid = bcrypt.compareSync(req.body.password, item.password)
    if (passwordIsValid) {
      return res.json({ state: passwordIsValid, role: item.role })
    }
  })
  res.json({ state: passwordIsValid })
})

module.exports = router
