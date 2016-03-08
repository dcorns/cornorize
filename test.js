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
auth.encrypt('sOmePazzWo2d', function(err, data){
  var hash = '';
  if(err) console.error(err);
  else{
    assert(data, 'Failed to hash password');
    hash = data;
    console.log(hash);
    console.log('encrypt test Passed');
  }
  //test authentication
  auth.authenticate({password: 'sOmePazzWo2d'}, {passHash: hash}, function(err, data){
    if(err){
      console.error(err);
    }
    else{
      assert(data, 'Failed to get authentication result');
      console.log('authenticate test Passed');
    }
    var payloadIn = {resourceList: ['/user/home/username'], accessLevel: ['admin']};
    var token = auth.makeToken(payloadIn, 35, 'IShouldWalkLikeJesusWalked');
    var payloadOut = auth.decodeToken(token, 'IShouldWalkLikeJesusWalked');
    assert(payloadIn.resourceList[0] === payloadOut.resources.resourceList[0], 'Payload.resourceList does not match');
    assert(payloadIn.accessLevel[0] === payloadOut.resources.accessLevel[0], 'Payload.accessLevel does not match');
    var expDate = new Date(payloadOut.expires);
    var dateNow = new Date();
    dateNow.setTime(dateNow.getTime() + 35 * 86400000);
    assert(expDate.toLocaleDateString() === dateNow.toLocaleDateString(), "Set expiration date failed");
    console.log('makeToken test Passed');
    var tokenResource = auth.getTokenResources(token, 'IShouldWalkLikeJesusWalked');
    assert(!tokenResource.error, 'Error returned on good input');
    assert(payloadIn.resourceList[0] === tokenResource.data.resourceList[0], 'Payload.resourceList does not match');
    assert(payloadIn.accessLevel[0] === tokenResource.data.accessLevel[0], 'Payload.accessLevel does not match');
    console.log('getTokenResources valid, return resource object input test Passed');
    var badSecret = auth.getTokenResources(token, 'dfjkd');
    assert(badSecret.error, 'getTokenResources bad secret did not return error');
    console.log('getTokenResources-bad secret test Passed');
    var badToken = auth.getTokenResources('$2a$10$xMGyqoTMcoaVKotBjEGc7./48C3rTWd8/mSi6bsQ9eoJ/IC.Gc.Op', 'IShouldWalkLikeJesusWalked');
    assert(badToken.error, 'getTokenResources bad secret did not return error');
    console.log('getTokenResources-bad token test Passed');
    var expiredToken = auth.makeToken({resource: '/not/for/you'}, -1, 'thisIsAnotherSecret');
    var expired = auth.getTokenResources(expiredToken, 'thisIsAnotherSecret');
    assert(expired.error, 'Failed to identify expired token');
    console.log('getTokenResources-expiration checking test Passed');

  });

});


