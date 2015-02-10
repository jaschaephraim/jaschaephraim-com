var ssm = require( 'SimpleStateManager' )( window );

ssm.addStates( [

  {
    id: 'mobile',
    maxWidth: 980,
    onEnter: function() {
      require( './mobile' );
    }
  },
  {
    id: 'desktop',
    minWidth: 981,
    onEnter: function() {
      require( './header' );
    }
  }

] ).ready();
