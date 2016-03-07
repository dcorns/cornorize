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
    console.log('Token Encode/Decode test--Note: Due to milliseconds difference between expiration time set and expiration time retrieval, this test could fail within a small fractional time frame each day');
    var payloadIn = {resourceList: ['/user/home/username'], accessLevel: 'admin'};
    var token = auth.makeToken(payloadIn, 35, 'IShouldWalkLikeJesusWalked');
    var payloadOut = auth.decodeToken(token, 'IShouldWalkLikeJesusWalked');
    assert(payloadIn.resourceList[0] === payloadOut.resources.resourceList[0], 'Payload.resourceList does not match');
    assert(payloadIn.accessLevel === payloadOut.resources.accessLevel, 'Payload.accessLevel does not match');
    var expDate = new Date(payloadOut.expires);
    var dateNow = new Date();
    dateNow.setTime(dateNow.getTime() + 35 * 86400000);
    assert(expDate.toLocaleDateString() === dateNow.toLocaleDateString(), "Set expiration date failed");
    console.log('Passed');
    console.log('Test getTokenResources');
    var tokenResource = auth.getTokenResources(token, 'IShouldWalkLikeJesusWalked');
    assert(payloadIn.resourceList[0] === tokenResource.resourceList[0], 'Payload.resourceList does not match');
    assert(payloadIn.accessLevel === tokenResource.accessLevel, 'Payload.accessLevel does not match');
    console.log('Passed');
  });

});


