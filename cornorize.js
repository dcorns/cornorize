/**
 * cornorize.js
 * Created by dcorns on 10/4/14.
 * Copyright © 2014 Dale Corns
 */
'use strict';

var  bcrypt = require('bcryptjs'),
     jwt = require('jwt-simple');
var errObj = {name: '', message: ''};
module.exports = (function () {
  return{
    authenticate: function (usrObj, authObj, cb) {

      //Check for minimum properties
      var chkFailed = testAuthorizeInput(usrObj, authObj);
      if(chkFailed) return cb(chkFailed, null);

      //Check userName
      errObj.name = 'Mismatch';
      if(authObj.userName){
        if(!(usrObj.userName)){
          errObj.message = 'authObj provided has userName, but no userName property on usrObj';
          return cb(errObj, null);
        }
        if(!(usrObj.userName === usrObj.userName)){
          errObj.message = 'userNames do not match';
          return cb(errObj, null);
        }
      }
      //Check email address
      if(authObj.email){
        if(!(usrObj.email)){
          errObj.message = 'authObj provided has email, but no email property on usrObj';
          return cb(errObj, null);
        }
        if(!(usrObj.email === usrObj.email)){
          errObj.message = 'email addresses do not match';
          return cb(errObj, null);
        }
      }

      testPassword(usrObj.password, authObj.passHash, function(err, data){
        if(err){
          cb(err, null);
        }
        else{
          if(data) cb(null, data);
          else{
            errObj.message = 'The password failed authentication';
            cb(errObj, null);
          }
        }
      });
    },
    //Returns hash of password
    encrypt: function (password, cb) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          if(err) return cb(err, null);
          else return cb(null, hash);
        });
      });
    },
    makeToken: function (resourceObject, daysValid, secret) {
      var exp = new Date();
      exp.setTime(exp.getTime() + daysValid * 86400000);
      var payload = {resources: resourceObject, expires: exp};
      return jwt.encode(payload, secret);
    },
    decodeToken: function (token, secret){
      return jwt.decode(token, secret);
    },
    getTokenResources: function (token, secret){
      var result;
      try{
       result = jwt.decode(token, secret);
      }
      catch(e){
        return {error: e};
      }
      if(tokenIsExpired(result.expires)){
        return {error: 'Token Expired!'};
      }
      return {data: result.resources};
    }
  }
})();
//usrObj and authObj require at the least a password property
function testAuthorizeInput(usrObj, authObj){
  if(!(usrObj.password)){
    errObj.name = 'Missing property';
    errObj.message = 'usrObj must have a password property';
    return errObj;
  }
  if(!(authObj.passHash)){
    errObj.name = 'Missing property';
    errObj.message = 'authObj must have a passHash property';
    return errObj;
  }
}

function testPassword(usr, auth, cb) {
  bcrypt.compare(usr, auth, function (err, res) {
    if(err) cb(err, null);
    else cb(null, res);
  });
}

function tokenIsExpired(exp){
  var today = new Date();
  exp = new Date(exp);
  return (today.getTime() > exp.getTime());
}