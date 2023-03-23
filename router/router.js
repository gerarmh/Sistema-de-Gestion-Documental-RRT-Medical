const router = require ("express").Router()
router.get("/", (req, res, next)=> {
    res.render("index")
    next()
})
router.get("/manual", (req, res, next)=> {
    res.render("manual")
    next()
})
router.get("/obsoletos", (req, res, next)=> {
    res.render("obsoletos")
    next()
})
router.get("/login", (req, res, next)=> {
    res.render("login")
    next()
})
router.get("/administrar", (req, res, next)=> {
    res.render("administrar")
    next()
})
module.exports=router
