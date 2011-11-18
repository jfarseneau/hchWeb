$( document ).ready( function() {
        $('#wterm').wterm( { WIDTH: '700px', HEIGHT: '400px', WELCOME_MESSAGE: "Welcome to Hub City Hack's terminal. To display available commands, type <strong>help</strong>. <br />If you lose your terminal pointer, click in the terminal window to regain it.<br /><br />" });
      });


      var command_directory = {
        'eval': function( tokens ) {
           tokens.shift();
           var expression = tokens.join( ' ' );
           var result = '';
           try {
             result = eval( expression ); 
           } catch( e ) {
             result = 'Error: ' + e.message;
           }
           return result;
         },

        'subscribe': function( tokens ) 
        {
            document.location.href = "http://lists.hubcityhack.com/cgi-bin/mailman/listinfo/discuss";
        },

        'archives': function( tokens ) 
        {
            document.location.href = "http://lists.hubcityhack.com/pipermail/discuss/";
        },
     
        'about': function( tokens ) 
		{
          return "Hub City Hack is a planned hackerspace in Moncton, New Brunswick.  ";
        },
		
		'news': function( tokens ) 
		{
			return "22-10-2010: Hub City Hack web site goes up.<br />";
			$("#wterm").attr({ scrollTop: $("#wterm").attr("scrollHeight") });
		},
		
		'wiki': function( tokens )
		{
			return "Sorry, the Wiki isn't available yet."
		},

       'twitter': function( tokens )
		{
			document.location.href = "https://twitter.com/#!/hubcityhack";
		},

        'date': function( tokens ) 
		{
          var now = new Date();
	  var month = parseInt(now.getMonth()) + 1;

          return now.getDate() + '-' +
                 month + '-' +
                 ( 1900 + now.getYear() )
        },
		
        'go': function( tokens ) {
           var url = tokens[1];
           document.location.href = url;
         },
		 
		 'thecakeisalie': function( tokens )
		 {
			return '<audio src="misc/portal_still_alive.ogg" autoplay="on" controls="on">';
		 },
		  
         'strrev': {
           PS1: 'strrev $',
 
           EXIT_HOOK: function() {
             return 'exit interface commands';
           },

           START_HOOK: function() {
             return 'exit interface commands';
           },
 
           DISPATCH: function( tokens ) {
             return tokens.join('').reverse();
           }
         }
      };

      for( var j in command_directory ) {
        $.register_command( j, command_directory[j] );
      }

      $.register_command( 'help', function() {
        return 'HCHTerm 1.2' + '<br /><br />' +
		  'subscribe - subscribe to the Hub City Hack mailing list.<br />' +
		  'archives - browse the mailing list archive.<br />' +
          'about - print a summary of what Hub City Hack is about.<br />' +
		  'news - print the latest news.<br />' +
		  'wiki - go to the HCH wiki.<br />' +
		  'twitter - go to the HCH Twitter page.<br />' +
		  'date - print the current date<br /><br />'
      });