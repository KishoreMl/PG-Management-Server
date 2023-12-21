const branchRouter = require("express").Router();
const dbo = require("../conn");

//create branch record
branchRouter.route('/branch/add').post((req, response) => {
    let db_connect = dbo.getDb("PG-management-temp");
    db_connect.collection("branch").insertOne(branch, function (err, res) {
        if (err) throw err;
        response.json(res);
    })
});

//get branch details
branchRouter.route('/branch/:branchId').get((req, res) => {
    let db_connect = dbo.getDb("PG-management-temp");
    let query = { branchId: req.params.branchId };
    db_connect
        .collection("branch")
        .findOne(query, function (err, result) {
            if (err)
                console.log(err);
            res.json(result);
        })
})

//update branch details
branchRouter.route('/branch/update/:branchId').post((req, response)=>{
    let db_connect = dbo.getDb("PG-management-temp");
    let query = { branchId: req.params.branchId};
    db_connect
        .collection("branch")
        .updateOne(query, newvalues, function (err, res) {
            if (err) throw err;
            console.log("updated ticket");
            response.json(res);
        })
})


//delete branch
branchRouter.route('/branch/:branchId').delete((req, res) => {
    let db_connect = dbo.getDb("PG-management-temp");
    let query = { branchId: req.params.branchId};
    db_connect
        .collection("branch")
        .deleteMany(query, function (err, obj) {
            if (err) throw err;
            console.log("ticket data deleted");
            res.status(obj);
        })
})

module.exports = branchRouter;