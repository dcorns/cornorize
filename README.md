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

Password key is required for both Objects. At a minimum the original password needs to be the value of usrObj.password and the original hash needs to be the value of authObj.password. Addtionally if either Object contains a userName and or email key, then the corresponding Object must contain the same key/value pairs in order to pass.

```javascript
auth.authenticate({password: 'sOmePazzWo2d'}, {password: hash}, function(err, data){
  if(err){
    console.error(err);
  }
  else{
    console.log('Passed');
  }
}
```

