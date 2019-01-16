'use strict';

const md5 = require('md5');

module.exports = function(User) {

    User.createuser = (data, cb) => {
      data['password'] = md5(data['password']);
      User.find({
        where:{username: data.username, status:'Active'}
      },(err,res)=>{
        if(res && res.length > 0){
          let message = {
            status: '201',
            message: 'user name already exist'
          }
          return cb(null, message);
        }
        else{


          User.upsert(data, (err, user) => {
            if (err) {
              let message = {
                status: '201',
                message: err
              }
            return  cb(null, message);
          } else {
            let message = {
              status: '200',
              message: 'Success Sign up'
            }
            return cb(null, message);
          }
          })
        }
      });


    };

    User.remoteMethod(
      'createuser',
      {
          http: {path: '/createuser', verb: 'post'},
          description: 'Create user',
          accepts: {arg: 'data', type: 'object', http: {source: 'body'}},
          returns: {arg: 'response', type: 'json'}
      }
  );


  User.login = (data, cb) => {
    data['password'] = md5(data['password']);
          User.find({
            where:{username: data.username,password: data.password, status:'Active'}
          },(err,res)=>{
            if(res && res.length > 0){
                let message = {
                  status: '200',
                  message: 'Success login',
                  id: res[0].id
                }
              return cb(null, message);
            }
            else{
              let message = {
                status: '200',
                message: 'Error login',
                id: '',
              }
              return cb(null, message);
            }
          });


        };


  User.remoteMethod(
    'login',
    {
        http: {path: '/login', verb: 'post'},
        description: 'Login user',
        accepts: {arg: 'data', type: 'object', http: {source: 'body'}},
        returns: {arg: 'response', type: 'json'}
    }
);

};
