var { Router } = require("exprango");
var router = new Router( );

router.get("/", ( req, res ) => {
  res.send("Hello figer");
});

module.exports = router;