const roomRouter = require("express").Router();
const dbo = require("../conn");

//create room
roomRouter.route('/room/add').post((req, response) => {
    let db_connect = dbo.getDb("PG-management-temp");
    db_connect.collection("room").insertOne(room, function (err, res) {
        if (err) throw err;
        response.json(res);
    })
});

//get room details
roomRouter.route('/room/:roomId').get((req, res) => {
    let db_connect = dbo.getDb("PG-management-temp");
    let query = { roomId: req.params.roomId };
    db_connect
        .collection("room")
        .find(query)
        .toArray(function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json(result);
                console.log(result);
            }
        });
})

// get all rooms in a branch
roomRouter.route('/rooms/:branchId').get((req, res) => {
    let db_connect = dbo.getDb("PG-management-temp");
    let query = { branchId: req.params.branchId };
    db_connect
        .collection("room")
        .find(query)
        .toArray(function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json(result);
            }
        });
})

//update room details
roomRouter.route('/room/update/:roomId').post((req, response)=>{
    let db_connect = dbo.getDb("PG-management-temp");
    let query = { roomId: req.params.roomId};
    db_connect
        .collection("room")
        .updateOne(query, newvalues, function (err, res) {
            if (err) throw err;
            console.log("updated ticket");
            response.json(res);
        })
})

//delete room detail
roomRouter.route('/room/:roomId').delete((req, res) => {
    let db_connect = dbo.getDb("PG-management-temp");
    let query = { roomId: req.params.roomId};
    db_connect
        .collection("room")
        .deleteMany(query, function (err, obj) {
            if (err) throw err;
            console.log("ticket data deleted");
            res.status(obj);
        })
})

module.exports = roomRouter;