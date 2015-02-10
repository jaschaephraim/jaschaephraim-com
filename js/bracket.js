var $ = require( 'jquery' );

var w = 15;
var h = scale( 90 );
var segment_h = scale( 15 );

var bracket_1 = new Bracket( 1.75 );
var bracket_2 = new Bracket( 0.8 );

module.exports.moveTo = function( bracket_id, center, top, bottom, animate ) {

  var bracket = bracket_id == 1 ? bracket_1 : bracket_2;
  var fn = animate ? 'animate' : 'css';

  bracket.$bracket[ fn ]( { top: top - segment_h * 2 } );
  bracket.$top_span[ fn ]( { height: center - top } );
  bracket.$bottom_span[ fn ]( { height: bottom - center } );
  
};

module.exports.fadeIn = function( dur ) {
  bracket_1.$bracket.add( bracket_2.$bracket ).animate( { opacity: 1 }, dur );
};

$( function() {

  $( '#tag-nav' ).append( bracket_1.$bracket );
  $( '#item-navs' ).append( bracket_2.$bracket );

} );

function Bracket( offset_scale ) {

  this.$bracket = $( '<div class="bracket" style="width: ' + w + 'px; height: ' + h + 'px; right: -' + ( w / offset_scale ) + '%" />' );
  this.$top = $( imgElement( 'top' ) );
  this.$top_span = $( imgElement( 'span' ) );
  this.$middle = $( imgElement( 'middle' ) );
  this.$bottom_span = $( imgElement( 'span' ) );
  this.$bottom = $( imgElement( 'bottom' ) );

  this.$bracket.append(
    this.$top,
    this.$top_span,
    this.$middle,
    this.$bottom_span,
    this.$bottom
  );
  
}

function scale( n ) {
  return w / 32 * n;
}

function imgElement( filename ) {
  return '<img src="img/bracket/' + filename + '.svg" style="width: ' + w + 'px" />';
}
