#cornorize
A lightweight module for authentication
## Getting Started

```shell
npm install cornorize --save
```

### Overview
In your project file `var cornorize = require('cornorize');`.

    auth.encrypt('sOmePazzWo2d', function(err, data){
      var hash = '';
      if(err) console.error(err);
      else{
        hash = data;
      }
    }

    auth.authenticate({password: 'sOmePazzWo2d'}, {password: hash}, function(err, data){
      if(err){
        console.error(err);
      }
      else{
        console.log('Passed');
      }
    }

