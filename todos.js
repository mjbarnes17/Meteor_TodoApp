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
    // Submit event for new todo
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
    },
    // Click event for the check-box
    'click .toggle-check': function() {
      // Updates '.toggle-check' if the check-box was checked
      Todos.update(this._id, {$set:{checked: ! this.checked}})
    },
    // Click event to delete a todo
    'click .delete-todo': function() {
      // If check-box is checked
      if (this.checked) {
        // Delete todo
        Todos.remove(this._id);
      }
    }
  });
}

// Runs on the server side
if (Meteor.isServer) {

}
