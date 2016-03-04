/**
 * test
 * Created by dcorns on 3/4/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var assert = require('assert');
var auth = require('./cornorize');

assert (auth, 'no cornorize object found after require');

//test encryption
console.log('Test encrypt...');
auth.encrypt('sOmePazzWo2d', function(err, data){
  var hash = '';
  if(err) console.error(err);
  else{
    assert(data, 'Failed to hash password');
    hash = data;
    console.log('Passed');
  }
  //test authentication
  console.log('Test authenticate...');
  auth.authenticate({password: 'sOmePazzWo2d'}, {password: hash}, function(err, data){
    if(err){
      console.error(err);
    }
    else{
      assert(data, 'Failed to get authentication result');
      console.log('Passed');
    }
  });
});

var token = auth.makeToken('dcorns@hotmail.com', 'IShouldWalkLikeJesusWalked');
console.dir(token);
