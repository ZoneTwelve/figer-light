const express = require("express");
const exprango = require("exprango");
const Router = new exprango.Router( );
const path = require("path");
const handlebars = require("handlebars");

Router.setView( "engine", handlebars );
Router.setView( "view", path.join( __dirname, "views" ));
Router.setView( "layout", path.join( __dirname, "views", "layout" ) );
Router.setView( "ext", ".hbs" );

Router.use( express.static( path.join(__dirname, "public") ) ); 

Router.get("/", (req, res) => {
  res.render( "index", {layout:"main"} );
});

// Router.get("/layout", ( req, res ) => {
//   res.render( "index", { layout: "main" } );
// })

module.exports = Router;