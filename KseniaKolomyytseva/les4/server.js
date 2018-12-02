const express = require( 'express' );
const path = require( 'path' );
const app = express();

app.set( 'port', ( process.env.PORT || 3000 ) );
app.use( '/', express.static( path.join( __dirname, 'dist' ) ) );
app.listen( app.get( 'port' ), () => {
    console.log( 'Server started: http://localhost:' + app.get( 'port' ) + "/\nCTRL + C to shutdown" );
} );