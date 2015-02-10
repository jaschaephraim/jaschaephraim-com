var $ = require( 'jquery' );

$( function() {

  var $tag_tabs = $( '#tag-nav a' );
  var $item_navs = $( '.item-nav' );
  var $tag_items = $( '.tag-items' );

  $tag_tabs.each( function( i, tag_el ) {

    var $item_nav = $item_navs.eq( i );
    var $items = $tag_items.eq( i ).children();

    $( tag_el ).click( function() {
      $item_navs.hide();
      $item_nav.show();
    } );

    $item_nav.find( 'a' ).each( function( j, item_el ) {
      $( item_el ).click( function() {
        $items.hide();
        $items.eq( j ).show();
      } );
    } );

  } );

} );
