'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Auctions = new Module('auctions');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Auctions.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Auctions.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Auctions.menus.add({
    'roles': ['authenticated'],
    'title': 'Auctions',
    'link': 'all auctions'
  });


  Auctions.aggregateAsset('css', 'auctions.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Auctions.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Auctions.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Auctions.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Auctions;
});
