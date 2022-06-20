const express = require('express')

const router = express.Router()

const bundle = require('../models/bundleSchema')

router.get('/', async(req, res) => { 
    try {
        const bundles = await bundle.find()
        res.json(bundles)
        console.log('All Available Bundles')
    }catch(error){ 
        res.send("Error" + error)
        console.log(error)
    }
})


router.post('/', async(req, res) => { 
 
         const bundles = new bundle({
          title: req.body.title,
          movieLimit: req.body.movieLimit,
          price: req.body.price

            })
 
    try {
        const b1 = await bundles.save()
        res.json(b1)
        console.log('bundle Added')
    }catch(error){ 
        res.send("Error" + error)
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    try { 
  
      const bundles = await bundle.findById(req.params.id)
      res.json(bundles)
      console.log(bundles)
    } catch(error) { 
      res.send("Error" + error)
      console.log(error)
    }
  })

router.patch('/:id', async (req, res) => {
    try{ 
        const bundles = await bundle.findById(req.params.id)
        bundles.price = req.body.price
        const b1 = await bundles.save()
        res.json(b1)
        console.log("Bundle Updated")
    }catch(error){ 
        res.send("error" + error)
        console.log(error)
    }
})



router.delete('/:id', async (req, res) => {
    try{ 
        const bundles = await bundle.findById(req.params.id)
        bundles.price = req.body.price
        const b1 = await bundles.remove()
        res.json(b1)
        console.log("Bundle Deleted")
    }catch(error){ 
        res.send("error" + error)
        console.log(error)
    }
})


module.exports = router