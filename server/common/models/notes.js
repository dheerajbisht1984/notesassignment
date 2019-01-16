'use strict';

module.exports = function (Notes) {
    var errorMessage = {};
    var successMessage = {};
    Notes.addnotes = function (req, cb) {
        Notes.validateCheck('add', req, cb);
        var adddata = {};
        adddata.name = req.name;
        Notes.upsert(adddata,function(err,response){
            if(err)
                {
                   Notes.errMessage(cb) ;
                }
                else
                    {
                        successMessage.status = "200";
                        successMessage.message = "Notes added successfully";
                        cb(null, successMessage);
                    }
        })
    }
     Notes.listnotes = function (req, cb) {
        
        var adddata = {};
        adddata.name = req.name;
        Notes.find({
            where : {status: { inq: [0] }}
        },function(err,response){
            if(err)
                {
                   Notes.errMessage(cb) ;
                }
                else
                    { if(response.length>0)
                        {
                        successMessage.status = "200";
                        successMessage.message = "Data fetched successfully";
                        cb(null, successMessage,response);
                        }
                    else{
                        successMessage.status = "200";
                        successMessage.message = "Data fetched successfully";
                        cb(null, successMessage,[]);
                    }
                    }
        })
    }

    Notes.validateCheck = function (callfor, req, cb) {
        switch (callfor) {
            case "add":
                if (req.name == undefined || req.name == '' || req.name == null) {
                    errorMessage.status = "201";
                    errorMessage.message = "Notes name can't blank";
                    return cb(null, errorMessage);
                }
                break;


        }
    }
        Notes.errMessage = function (cb) {

            errorMessage.status = "201";
            errorMessage.message = "Error Occurred";
            return cb(null, errorMessage);


        }

        Notes.remoteMethod(
            'addnotes',
            {
                http: { verb: 'post' },
                description: 'Add notes List',
                accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
                returns: [{ arg: 'response_status', type: 'string' }, { arg: 'response', type: 'string' }]
            }
        );
        Notes.remoteMethod(
            'listnotes',
            {
                http: { verb: 'post' },
                description: 'Listnotes',
                accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
                returns: [{ arg: 'response_status', type: 'string' }, { arg: 'response', type: 'string' }]
            }
        );

    };
