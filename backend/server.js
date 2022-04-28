const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const mongoose = require('mongoose');

const db = mongoose.connection;
const url = "mongodb://127.0.0.1:27017/find";

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

const itemType = {
    phone: 1,
    laptop: 2,
    earphone: 3,
    card: 4,
    wallet: 5,
    apparel: 6,
    misc: 7
};

const findSchema = new mongoose.Schema({
    _claimed: {
        type: Boolean
    },
    _name: {
        type: String
    },
    _found_Date: {
        type: Date
    },
    _claim_Date: {
        type: Date
    },
    _upload_Date: {
        type: Date
    },
    _update_Date: {
        type:Date
    },
    _found_Location: {
        type: String
    },
    _claim_Location: {
        type: String
    },
    _misc: {
        type: String
    },
    _itemType: {
        type: Number
    },
    _imageUrl: {
        type: String
    },
}, {collection: 'items'});

const FIND = mongoose.model('FIND', findSchema);

app.post("/post", function (req, res) {
    console.log(req.params);
    const a_item = new FIND( {
        _claimed: false,
        _name: req.body.name,
        _found_Date: req.body.found_Date,
        _found_Location: req.body.found_Location,
        _claim_Location: req.body.claim_Location,
        _itemType: req.body.itemType,
        _imageUrl: req.body.imageUrl,
        _misc: req.body.misc,
        _detail: req.body.detail,
        _upload_Date: new Date()
    });
    a_item.save((error, doc) => {
        if (error) {
            res.json({ERROR: error});
        } else {
            res.json({
                status: "Successfully posted the following item.",
                Details: a_item
            })
            console.log("post successful");
        }
    })
});

/*@return: all items from the database as a .json file.*/
app.get("/list", function (req, res) {
    console.log("fetch reqest")
    FIND.find().exec((error, items) => {
        if (error) {
            console.log(error);
            res.json({Error: error});
        } else {
            console.log(items);
            res.json(items);
        }
    })
});


app.get("/search", function (req, res) {
    FIND.find(req.body).exec((error, items) => {
        if (error) {
            console.log(error);
            res.json({Error: error});
        } else {
            res.json(items);
        }

    })
});

app.get("/update", function (req, res) {
    FIND.find(req.body).exec((error, item) => {
        if (error) {
            console.log(error);
            res.json({Error: error});
        } else {

        }
    })
});



app.delete("/delete", function (req, res) {
    
});



app.delete("/clear", function (req, res) {
    FIND.deleteMany({}, (err) => {
        if (err) {
            res.json({
                status: "Failed to clear database."
            });
        } else {
            res.json( {
                status: "Database cleared"
            })
        }
    });
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  });