const ownerRouter = require("express").Router();
const dbo = require("../conn");

//create owner record
ownerRouter.route('/owner/add').post((req, response) => {
    let db_connect = dbo.getDb("PG-management-temp");
    db_connect
        .collection("owner")
        .insertOne(owner, function (err, res) {
        if (err) throw err;
        response.json(res);
    })
});

//get owner details
ownerRouter.route('/owner/:roomId').get((req, res) => {
    let db_connect = dbo.getDb("PG-management-temp");
    let query = { ownerId: req.params.roomId };
    db_connect
        .collection("owner")
        .findOne(query, function (err, result) {
            if (err)
                console.log(err);
            res.json(result);
        })
})

//update owner details
ownerRouter.route('/owner/update/:roomId').post((req, response)=>{
    let db_connect = dbo.getDb("PG-management-temp");
    let query = { ownerId: req.params.roomId};
    db_connect
        .collection("owner")
        .updateOne(query, newvalues, function (err, res) {
            if (err) throw err;
            console.log("owner details updated");
            response.json(res);
        })
})


//delete owner
ownerRouter.route('/owner/:roomId').delete((req, res) => {
    let db_connect = dbo.getDb("PG-management-temp");
    let query = { ownerId: req.params.roomId};
    db_connect
        .collection("owner")
        .deleteMany(query, function (err, obj) {
            if (err) throw err;
            console.log("owner data deleted");
            res.status(obj);
        })
})

module.exports = ownerRouter;