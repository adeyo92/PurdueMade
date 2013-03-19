if (Meteor.isClient) {
  Companies = new Meteor.Collection("companies");
  People = new Meteor.Collection("people");
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  Companies = new Meteor.Collection("companies");
  People = new Meteor.Collection("people");
  });
}
