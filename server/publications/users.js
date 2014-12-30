/*
*
* To make this available on the client, use a reactive cursor, 
* such as by creating a publication on the server: 
*/
Meteor.publish('connectUser', function() {
    var _this = this,
        user = Users.findOne(_this.userId);
        
    // if user then ready subscribe
    if (user) { 

        // status offline then
        if (user.profile.status == 'offline') {
        
            // User profile.status update online
            Users.update(_this.userId, { $set: { 'profile.status': 'online' }});
        }

        // user close subscribe onStop callback update user.profile.status 'offline'
        _this.onStop(function() {
            
            // update offline user
            Users.update(_this.userId, { $set: { 'profile.status': 'offline' }});
        });
    }

    
    // subscribe ready 
    _this.ready();
});

Meteor.publishComposite('profile', function(username) {
    return {
        find: function() {
            return Users.find({ username: username });
        }
    }
});
