if (Meteor.isClient) {
	Companies = new Meteor.Collection("companies");
	People = new Meteor.Collection("people");

	 Template.login.events({

	    'submit #login-form' : function(e, t){
	      e.preventDefault();
	      // retrieve the input field values
	      var email = t.find('#login-email').value
	        , password = t.find('#login-password').value;

	        // Trim and validate your fields here.... 
	        email = trimInput(email);


	        // If validation passes, supply the appropriate fields to the
	        // Meteor.loginWithPassword() function.
	        Meteor.loginWithPassword(email, password, function(err){
		        if (err) {
		          // The user might not have been found, or their passwword
		          // could be incorrect. Inform the user that their
		          // login attempt has failed. 
		        } else {
		          // The user has been logged in.
		        }
	     		});
	         return false; 
	      }
	  });
		 Template.register.events({
	    'submit #register-form' : function(e, t) {
	      e.preventDefault();
	      var email = t.find('#account-email').value
	        , password = t.find('#account-password').value;

	       // Trim and validate the input
	       email = trimInput(email);
	       password = isValidPassword(password, e.currentTarget.id);

	      Accounts.createUser({email: email, password : password}, function(err) {
	          if (err) {
	            // Inform the user that account creation failed
	          } else {
	            // Success. Account has been created and the user
	            // has logged in successfully. 
	          }
	        });
	    	}
	   });

    // trim helper
	  var trimInput = function(val) {
	    return val.replace(/^\s*|\s*$/g, "");
	  }

	  //make sure password is 6 characters
	  var isValidPassword = function(val,form) {
     if (val.length >= 6) {
     	return true;
     } else {
     	 Session.set('displayMessage', "Password must be at least 6 characters long.");
     	 Session.set('displayMessageForm', form)
     	 return false;
     }
  	}

  //function to display error messages
	Deps.autorun(function() {
    // Whenever this session variable changes, run this function.
    var message = Session.get('displayMessage');
    var messageForm = Session.get('displayMessageForm');
    if (message) {
    	//use jquery to diplay message
    	$("#"+messageForm).prepend(message);

      Session.set('displayMessage', null);
      Session.set('displayMessageForm', null);
    }
  });

}

if (Meteor.isServer) {
	Meteor.startup(function () {
	  	Companies = new Meteor.Collection("companies");
	  	People = new Meteor.Collection("people");

	  	//insert test company data
	  	if(Companies.find().count() === 0){
	  		var testCompany = {
	  			name: "Kyk Energy",
	  			picture: "kyk_logo.jpg",
	  			description: "The dopest flavor nuetral energy powder company brah.",
	  			website: "http://kykenergy.com",
	  			resource: 0 //indicates whether the entry is a resource or a company. companies -> 0; resources -> 1
	  		}
	  		Companies.insert(testCompany);
	  	}

	  	//insert test people data
	  	if(People.find().count() === 0){
	  		var testPerson = {
	  			name: "Andrew Linfoot",
	  			picture: "andrew_picture.jpg",
	  			description: "Purdue entrepreneur. loves startups and such",
	  			title: "CEO/Co-Founder",
	  			website: "http://andrewlinfoot.com",
	  			twitter: "andrewlinfoot",
	  			linkedin: "alinfoot",
	  			major: "Industrial Engineering",
	  			gradClass: "2014"
	  		}
	  		People.insert(testPerson);
	  	}
	});
}
