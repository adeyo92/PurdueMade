if (Meteor.isClient) {
	Companies = new Meteor.Collection("companies");
	People = new Meteor.Collection("people");

	Template.signup.events({
		'click button': function (e) {
			//render template for signup form pass data for type of user based on which button is clicked
			var userType = e.currentTarget.id;
			console.log(userType);
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
