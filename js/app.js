var $ = require( 'jquery' );
var ssm = require( 'SimpleStateManager' )( window );

var deferredInitState = $.Deferred();
var deferredInitTabs = $.Deferred();
$.when( deferredInitState, deferredInitTabs )
  .done( function ( is_mobile, tab_data ) {
    if ( is_mobile )
      require( './mobile' )( tab_data );
    else
      require( './header' )( tab_data );
  } );

var tabs = [];
var num_tags = 0;
var current_tag = 0;

$( function () {

  var $tag_tabs = $( '#tag-nav a' );
  var $item_navs = $( '.item-nav' );
  var $tag_items = $( '.tag-items' );

  $tag_tabs.each( function ( i, tag_tab ) {

    tabs[ i ] = {

      $tag_tab: $( tag_tab ),
      $item_nav: $item_navs.eq( i ),
      $tag_item: $tag_items.eq( i ),
      items: [],
      num_items: 0,
      current_item: 0

    };

    var tab = tabs[ i ];
    num_tags++;
    tab.$item_tabs = tab.$item_nav.find( 'a' );
    tab.$items = tab.$tag_item.find( '.item' );
    tab.goTo = function () {
      current_tag = i;

      $tag_tabs.removeClass( 'current' );
      tab.$tag_tab.addClass( 'current' );

      tab.transition();
    };
    tab.$tag_tab.click( tab.goTo );

    tab.$item_tabs.each( function ( j, item_tab ) {

      tab.items[ j ] = {

        $item_tab: $( item_tab ),
        $item: tab.$items.eq( j )

      };

      var item = tab.items[ j ];
      tab.num_items++;
      item.goTo = function () {
        tab.current_item = j;

        tab.$item_tabs.removeClass( 'current' );
        item.$item_tab.addClass( 'current' );

        item.transition();
      };
      item.$item_tab.click( item.goTo );

    } );

  } );

  var hash = window.location.hash;
  var parsed_hash;
  if ( hash ) {
    parsed_hash = hash.split( '/' );
    current_tag = $tag_tabs.index(
      $tag_tabs.filter( '[href="' + parsed_hash[ 0 ] + '"]' )
    );
    if ( parsed_hash.length > 1 ) {
      var tab = tabs[ current_tag ];
      var $item_tabs = tab.$item_tabs;
      tab.current_item = $item_tabs.index(
        $item_tabs.filter( '[href="' + hash + '"]' )
      );
    }
  }

  deferredInitTabs.resolve( {
    tabs: tabs,
    num_tags: num_tags,
    current_tag: current_tag,
    $tag_tabs: $tag_tabs,
    $item_navs: $item_navs,
    $tag_items: $tag_items,
    parsed_hash: parsed_hash
  } );

} );

ssm.addStates( [

  {
    id: 'mobile',
    maxWidth: 980,
    onEnter: function () {
      deferredInitState.resolve( true );
    }
  }, {
    id: 'desktop',
    minWidth: 981,
    onEnter: function () {
      deferredInitState.resolve( false );
    }
  }

] ).ready();
