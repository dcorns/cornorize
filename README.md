#cornorize
A lightweight module for authentication
## Getting Started

```shell
npm install cornorize --save
```

## Overview
In your project file 
```javascript
var auth = require('cornorize');
```

## Usage Examples
### encrypt: Encrypt input and return cb(null, String *resulting hash*) or cb(Object err, null)
#### Parameters
- **String** *password*
- **Function** *cb*

```javascript
   auth.encrypt('sOmePazzWo2d', function(err, data){
     var hash = '';
     if(err) console.error(err);
     else{
       hash = data;
     }
   }
```

### authenticate: Compares usrObj to authObj and returns cb(null, true) if successful, otherwise returns cb(errorObject, null)
#### Parameters
- **Object** *usrObj*
```javascript
{password: String,
[username: String,
email: String]}
```
- **Object** *authObj*
```javascript
{password: String,
[username: String,
email: String]}
```
- **Function** *cb*

At a minimum the original password needs to be the value of usrObj.password and the original hash needs to be the value of authObj.passHash. Additionally if either Object contains a userName and or email key, then the corresponding Object must contain the same key/value pairs in order to pass authentication.

```javascript
auth.authenticate({password: 'sOmePazzWo2d'}, {passHash: '$2a$10$iJ/oqCu/KOx9LiyYtFgcIukTj624RbPr1WKSHKU0/9lQelSK8sd4m'}, function(err, data){
  if(err){
    console.error(err);
  }
  else{
    console.log('Passed');
  }
}
```

### makeToken: Takes a resource object, an expiration integer and a secret. Returns a token.
#### Parameters
- **Object** *resourceObject*
- **Integer** *daysValid*
- **String** *secret*

```javascript
var payloadIn = {resourceList: ['/user/home/username'], accessLevel: ['admin']};
var token = auth.makeToken(payloadIn, 35, 'IShouldWalkLikeJesusWalked');
```

### getTokenResource: Takes a token and a secret. Returns a failure object {error: *error message*} or a resource object {data: *resourceObject*}.
#### Parameters
- **String** *token*
- **String** *secret*

```javascript
var payloadOut = auth.decodeToken(token, 'IShouldWalkLikeJesusWalked');
```

## Testing
Due to milliseconds difference between expiration time set and expiration time retrieval from test, token test may appear to fail at milliseconds <> date change. This is a problem with test and not the token code. Running the test again after a minute should yield a proper result. 
```bash
npm install;
npm test;
```