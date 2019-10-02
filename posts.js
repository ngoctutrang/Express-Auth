const router =require('express').Router()
const midleware = require('./verifyToken')
router.get('/', midleware, (req, res)=>{
    console.log('User:', req.user)
    res.json({
        posts:{
            title: 'Title Post',
            text: 'Text post'
        }
    })
})

module.exports = router