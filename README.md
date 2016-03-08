#cornorize
A lightweight module for authentication
## Getting Started

```shell
npm install cornorize --save
```

### Overview
In your project file `var auth = require('cornorize');`.

### Usage Examples
#### encrypt: Encrypt input and return the hash
##### Parameters
- String *password*
- Function *cb*

```javascript
   auth.encrypt('sOmePazzWo2d', function(err, data){
     var hash = '';
     if(err) console.error(err);
     else{
       hash = data;
     }
   }
```

####authenticate: Requires a password and hash input and optionally can contain and email and userName property

    auth.authenticate({password: 'sOmePazzWo2d'}, {password: hash}, function(err, data){
      if(err){
        console.error(err);
      }
      else{
        console.log('Passed');
      }
    }

