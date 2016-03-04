/**
 * cornorize.js
 * Created by dcorns on 10/4/14.
 * Copyright © 2014 Dale Corns
 */
'use strict';

var  bcrypt = require('bcryptjs');
//  jwt = require('jwt-simple'),
//  corngoose = require('../js/corngoose');
var errObj = {name: 'Missing Parameter', message: 'Missing second parameter authorization object {password:\'\''};
module.exports = function () {
  return{
    authenticate: function (usrObj, authObj, cb) {
      //Check parameters
      if(!(authObj)) return cb(errObj, null);
      if(!(usrObj)){
        errObj.name = 'Missing first parameter user object {password:\'\'';
        return cb(errObj, null);
      }
      //Check for minimum properties
      var chk = testAuthorizeInput(usrObj, authObj);
      if(chk) return cb(chk, null);

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

      var pass = testPassword(usrObj.password, authObj.password);
      if(pass){
        return cb(null, true);
      }
      else{
        errObj.message = 'The password failed authentication';
      }

    },
    Returns hash of password
    encrypt: function (password, cb) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          if(err) return cb(err, null);
          else return cb(null, hash);
        });
      });
    }
    //makeToken: function (cb) {
    //  var payload = {email: usrObj.email};
    //  var secret = usrObj.password;
    //  usrObj.atoken = jwt.encode(payload, secret);
    //  corngoose.dbDocUpdate(payload, {atoken: usrObj.atoken}, 'users', function(err, stored){
    //    if(err){
    //      return cb(err, null);
    //    }
    //    if(stored){
    //      corngoose.dbDocFind({email: usrObj.email}, 'users', function(err, doc){
    //        if(err){
    //          return cb(err, null);
    //        }
    //        return cb(null, doc[0]);
    //      });
    //    }
    //  });
    //},
    //getTokenInfo: function (tk, cb) {
    //  corngoose.dbDocFind({atoken: tk}, 'users', function(err, doc){
    //    if(err){
    //      return cb(err, null);
    //    }
    //    return cb(null, doc[0]);
    //  });
    //},
    //authorizePgpEdit: function (user, pgpID, cb){
    //  corngoose.dbDocFind({_id: pgpID}, 'notes', function(err, cursor){
    //    if(err) return cb(err, null);
    //    var authorized = false;
    //    if(cursor[0].ta){
    //      if(cursor[0].ta === user.email || user.roll === 'admin'){
    //        authorized = true;
    //      }
    //    }
    //    else{
    //      authorized = true;
    //    }
    //    return cb(null, authorized);
    //  });
    //},
    //basicAuth: function(credentialsIn, cb){
    //  corngoose.dbDocFind({type:'authorization'}, 'protectedvar', function(err, doc){
    //    if(err){
    //      console.log('authorize 95 DataError: '+err.msg);
    //      return cb(err, false);
    //    }
    //    if(credentialsIn === doc[0].basicAuthVar){
    //      return cb(null, true);
    //    }
    //    else{
    //      return cb(null, false);
    //    }
    //  });
    //}
  }
};
//usrObj and authObj require at the least a password property
function testAuthorizeInput(usrObj, authObj){
  if(!(usrObj.password)){
    errObj.name = 'Missing property';
    errObj.message = 'usrObj must have a password property';
    return errObj;
  }
  if(!(authObj.password)){
    errObj.name = 'Missing property';
    errObj.message = 'authObj must have a password property';
    return errObj;
  }
}

function testPassword(usr, auth) {
  bcrypt.compare(usr, auth, function (err, res) {
    return res;
  });
}