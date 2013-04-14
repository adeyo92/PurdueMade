if (Meteor.isClient) {
	Companies = new Meteor.Collection("companies");
	Categories = new Meteor.Collection("categories");
	People = new Meteor.Collection("people");

	//handles routes and page navigation
	var Router = Backbone.Router.extend({
		routes: {
			"" : 	"main",
			"login": "login",
			"signup": "signup",
			"companies": "companies",
			"company/:company_id": "company",
			"students": "students",
			"dashboard": "dashboard",
			"alumni": "alumni",
			"resources": "resources"
		},

		main: function() {
			Session.set('currentPage', 'mainPage');
		},

		login: function() {
			Session.set('currentPage', 'loginPage');
		},

		signup: function() {
			Session.set('currentPage', 'signupPage');
		},

		companies: function() {
			Session.set('currentPage', 'companiesPage');
		},

		company: function(company_id) {
			Session.set('companyProfile', company_id);
			Session.set('currentPage', 'companyPage');
		},

		students: function() {
			Session.set('currentPage', 'studentsPage');
		},

		alumni: function() {
			Session.set('currentPage', 'alumniPage');
		},

		resources: function() {
			Session.set('currentPage', 'resourcesPage');
		},

		dashboard: function() {
			Session.set('currentPage', 'dashboardPage');
		}
	});
	var app = new Router;
	Meteor.startup(function () {
		Backbone.history.start({pushState: true});
	});
	Template.renderPage.mainPage = function() {
		if( Session.get('currentPage') === 'mainPage' ) {
			return true;			
		} else {
			return false;
		}
	}	
	Template.renderPage.loginPage = function() {
		if( Session.get('currentPage') === 'loginPage' ) {
			return true;			
		} else {
			return false;
		}
	}
	Template.renderPage.signupPage = function() {
		if( Session.get('currentPage') === 'signupPage') {
			return true;
		} else {
			return false;
		}
	}
	Template.renderPage.companiesPage = function() {
		if( Session.get('currentPage') === 'companiesPage') {
			return true;
		} else {
			return false;
		}
	}
	Template.renderPage.companyPage = function() {
		if( Session.get('currentPage') === 'companyPage') {
			return true;
		} else {
			return false;
		}		
	}
	Template.renderPage.studentsPage = function () {
		if( Session.get('currentPage') === 'studentsPage') {
			return true;
		} else {
			return false;
		}		
	}
	Template.renderPage.alumniPage = function () {
		if( Session.get('currentPage') === 'alumniPage') {
			return true;
		} else {
			return false;
		}		
	}
	Template.renderPage.resourcesPage = function () {
		if( Session.get('currentPage') === 'resourcesPage') {
			return true;
		} else {
			return false;
		}		
	}
	Template.renderPage.dashboardPage = function() {
		if( Session.get('currentPage') === 'dashboardPage') {
			return true;
		} else {
			return false;
		}
	}

	//Header Events: used for page navigation
	Template.header.events({
		//note: using the _headerpage syntax because of conflicts with CSS when adding id values
		'click #_main' : function(e, t) {
			e.preventDefault();
			window.scrollTo(0,0);
			app.navigate("", {trigger: true} );
		},		
		'click #_companies' : function(e, t) {
			e.preventDefault();
			window.scrollTo(0,0);
			app.navigate("companies", {trigger: true} );
		},
		'click #_students' : function(e, t) {
			e.preventDefault();
			window.scrollTo(0,0);
			app.navigate("students", {trigger: true} );
		},
		'click #_signup' : function(e, t) {
			e.preventDefault();
			window.scrollTo(0,0);
			app.navigate("signup", {trigger: true} );
		},
		'click #_alumni' : function(e, t) {
			e.preventDefault();
			window.scrollTo(0,0);
			app.navigate("alumni", {trigger: true} );
		},
		'click #_resources' : function(e, t) {
			e.preventDefault();
			window.scrollTo(0,0);
			app.navigate("resources", {trigger: true} );
		},
		'click #_login' : function(e, t) {
			e.preventDefault();
			window.scrollTo(0,0);
			app.navigate("login", {trigger: true} );
		},
		'click #_logout' : function(e, t) {
			e.preventDefault();
			Meteor.logout( function(e) {
				console.log("logged out");
				if(e) {
					console.log(e);
				}
			});
		},
		'click #_dashboard' : function(e, t) {
			e.preventDefault();
			window.scrollTo(0,0);
			app.navigate("dashboard", {trigger: true} );			
		}
	});

	//Companies Templates
	Template.companies.companies = function() {
		return Companies.find();
	}
	Template.companies.categories = function() {
		return Categories.find();
	}

	//Company Profile Template
	Template.companyProfile.companyInfo = function() {
		return Companies.find(Session.get('companyProfile'));
	}

	//Students Templates
	Template.students.students = function() {
		return People.find();
	}

	//Alumni Templates
	Template.alumni.alumni = function() {
		return People.find();
	}

	//Resources Templates
	Template.resources.resources = function() {
		return Companies.find();
	}
	Template.resources.categories = function() {
		return Categories.find();
	}

	Template.login.events({
		//code for email login
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
	    },

	    //social logins/signups
	    'click .facebook' : function(e, t){
	      	Meteor.loginWithFacebook( {} , function(e) {
	      		console.log(e);
	      	});
	    },	      
	    'click .twitter' : function(e, t){
	      	Meteor.loginWithTwitter( {} , function(e) {
	      		console.log(e);
	      	});
	    },      
	    'click .gplus' : function(e, t){
	      	Meteor.loginWithGoogle( {} , function(e) {
	      		console.log(e);
	      	});
	    }
	});

	Template.signup.events({
		//code for email signup
	    'submit #signup-form' : function(e, t) {
	    	e.preventDefault();
	    	var email = t.find('#signup-email').value
	        , password = t.find('#signup-password').value
	        , confirm_password = t.find('#signup-confirm-password').value;

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
	    },

		//social logins/signups	    
	    'click .facebook' : function(e, t){
	    	Meteor.loginWithFacebook( {} , function(e) {
	      		console.log(e);
	      	});
	    },	      
	    'click .twitter' : function(e, t){
	    	Meteor.loginWithTwitter( {} , function(e) {
	      		console.log(e);
	      	});
	    },      
	    'click .gplus' : function(e, t){
	      	Meteor.loginWithGoogle( {} , function(e) {
	      		console.log(e);
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
	     	Session.set('displayMessageForm', form);
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


	//functions to load required javascript for UI on template render
	Template.header.rendered = function() {
		header_js();
		console.log('Template onLoad');	
	}
	Template.feature_slider.rendered = function() {
		feature_slider_js();
		console.log('Template onLoad');
	}	
	Template.service.rendered = function() {
	    servicesCircle.initialize();
	    console.log('Template onLoad');
	}
	Template.companyTile.rendered = function() {
		$(function(){
            var $container = $('#gallery_container'),
                  $filters = $("#filters a");
        
            $container.imagesLoaded( function(){
                $container.isotope({
                    itemSelector : '.photo',
                    masonry: {
                        columnWidth: 313
                    }
                });
            });

            // filter items when filter link is clicked
            $filters.click(function() {
                $filters.removeClass("active");
                $(this).addClass("active");
                var selector = $(this).data('filter');
                $container.isotope({ filter: selector });
                return false;
            });
        	console.log('Companies rendered');
        });
	}
	Template.studentTile.rendered = function() {
		$(function(){
            var $container = $('#gallery_container'),
                  $filters = $("#filters a");
        
            $container.imagesLoaded( function(){
                $container.isotope({
                    itemSelector : '.post',
                    masonry: {
                        columnWidth: 235
                    }
                });
            });

            // filter items when filter link is clicked
            $filters.click(function() {
                $filters.removeClass("active");
                $(this).addClass("active");
                var selector = $(this).data('filter');
                $container.isotope({ filter: selector });
                return false;
            });
        	console.log('Students rendered');
        });		
	}		
	Template.alumTile.rendered = function() {
		$(function(){
            var $container = $('#gallery_container'),
                  $filters = $("#filters a");
        
            $container.imagesLoaded( function(){
                $container.isotope({
                    itemSelector : '.post',
                    masonry: {
                        columnWidth: 235
                    }
                });
            });

            // filter items when filter link is clicked
            $filters.click(function() {
                $filters.removeClass("active");
                $(this).addClass("active");
                var selector = $(this).data('filter');
                $container.isotope({ filter: selector });
                return false;
            });
        	console.log('Students rendered');
        });		
	}
	Template.resourceTile.rendered = function() {
		$(function(){
            var $container = $('#gallery_container'),
                  $filters = $("#filters a");
        
            $container.imagesLoaded( function(){
                $container.isotope({
                    itemSelector : '.photo',
                    masonry: {
                        columnWidth: 313
                    }
                });
            });

            // filter items when filter link is clicked
            $filters.click(function() {
                $filters.removeClass("active");
                $(this).addClass("active");
                var selector = $(this).data('filter');
                $container.isotope({ filter: selector });
                return false;
            });
        	console.log('Companies rendered');
        });
	}	
}

if (Meteor.isServer) {
	Meteor.startup(function () {
	  	Companies = new Meteor.Collection("companies");
	  	Categories = new Meteor.Collection("categories");
	  	People = new Meteor.Collection("people");

	  	//insert test company data
	  	if(Companies.find().count() === 0){
	  		var testCompany = {
	  			name: "Kyk Energy",
	  			picture: "kyk_logo.jpg",
	  			description: "The dopest flavor nuetral energy powder company brah.",
	  			website: "http://kykenergy.com",
	  			category: "Retail",
	  			resource: 0 //indicates whether the entry is a resource or a company. companies -> 0; resources -> 1
	  		}
	  		var companyPictures = [  "kyk_logo.jpg",
	  								 "amatron.png",
	  								 "cloud.png",
	  								 "fruit.png",
	  								 "music.png",
	  								 "pirate.png",
	  								 "raptor.png",
	  								 "shitstorm.png",
	  								 "soul.png"];
	  		var companyCategories = [ "Retail", "SAAS", "Mobile", "Other"];
	  		for($i = 0; $i < companyPictures.length; $i++) {
	  			testCompany.picture = companyPictures[$i];
	  			testCompany.category = companyCategories[Math.floor(Math.random()*companyCategories.length)];
	  			Companies.insert(testCompany);	  			
	  		}
	  	}
	  	//insert initial categories data
	  	if(Categories.find().count() === 0){
	  		var categorySet = [ "Retail", "SAAS", "Mobile", "Other"];
	  		for($i = 0; $i < categorySet.length; $i++) {
	  			Categories.insert({ name: categorySet[$i] });
	  		}
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
	  			gradClass: "2014",
	  			skills: "design development"

	  		}
	  		peopleDescriptions = [  "There are many variations of passages of generators on the embarrassing hidden in slightly distracted by these distribution of letters, as opposed.",
	  								"I live STARTUPS!!!!!",
	  								"There are many variations of passages of generators on the embarrassing hidden in slightly distracted by these distribution of letters, as opposed.There are many variations of passages of generators on the embarrassing hidden in slightly distracted by these distribution of letters, as opposed.There are many variations of passages of generators on the embarrassing hidden in slightly distracted by these distribution of letters, as opposed.",
	  								"Description",
	  								"Adeyo Smells"];
	  		peopleSkills = ["design", "development", "sales", "marketing", "other"];
	  		for($i = 1; $i < 10; $i++) {
	  			testPerson.skills = peopleSkills[Math.floor(Math.random()*peopleSkills.length)];
	  			testPerson.skills = testPerson.skills + " " + peopleSkills[Math.floor(Math.random()*peopleSkills.length)];
	  			testPerson.description = peopleDescriptions[Math.floor(Math.random()*peopleDescriptions.length)];
	  			testPerson.picture = "smile" + $i + ".jpg";
	  			People.insert(testPerson);
	  		}

	  	}
	});
}
