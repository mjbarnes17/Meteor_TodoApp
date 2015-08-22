Todos = new Mongo.Collection('todos');

// Runs only on the client side.
if (Meteor.isClient) {
  // Template Helpers
  Template.main.helpers({
    todos: function() {
      return Todos.find({}, {sort: {createdAt: -1}});
    }
  });

  // Template Events
  Template.main.events({
    'submit .new-todo': function(event) {
      var text = event.target.text.value;
      // Creates a new todo
      Todos.insert({
        text: text,
        createdAt: new Date()
      });
      // Clears form after entering new todo in text input
      event.target.text.value='';
      // Prevents submit
      return false;
    }
  });
}

// Runs on the server side
if (Meteor.isServer) {

}
