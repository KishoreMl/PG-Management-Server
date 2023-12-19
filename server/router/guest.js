const guestRouter = require("express").Router();
const dbo = require("../db/conn");

//create room
guestRouter.route('/guest/add').post((req, response) => {
    let db_connect = dbo.getDb("PG-management-temp");
    db_connect.collection("guest").insertOne(guest, function (err, res) {
        if (err) throw err;
        response.json(res);
    })
});

//get guest details
guestRouter.route('/guest/:guestId').get((req, res) => {
    let db_connect = dbo.getDb("PG-management-temp");
    let query = { guestId: req.params.guestId };
    db_connect
        .collection("guest")
        .findOne(query, function (err, result) {
            if (err)
                console.log(err);
            res.json(result);
        })
})

//update guest details
guestRouter.route('/guest/update/:guestId').post((req, response)=>{
    let db_connect = dbo.getDb("PG-management-temp");
    let query = { guestId: req.params.guestId};
    db_connect
        .collection("guest")
        .updateOne(query, newvalues, function (err, res) {
            if (err) throw err;
            console.log("updated ticket");
            response.json(res);
        })
})


//delete guest
guestRouter.route('/guest/:guestId').delete((req, res) => {
    let db_connect = dbo.getDb("PG-management-temp");
    let query = { guestId: req.params.guestId};

    db_connect
        .collection("guest")
        .deleteMany(query, function (err, obj) {
            if (err) throw err;
            console.log("ticket data deleted");
            res.status(obj);
        })
})

module.exports = guestRouter;