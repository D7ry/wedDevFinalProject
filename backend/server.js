const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());

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
    claimed: {
        type: Boolean
    },
    name: {
        type: String
    },
    found_Date: {
        type: Date
    },
    claim_Date: {
        type: Date
    },
    found_Location: {
        type: String
    },
    claim_Location: {
        type: String
    },
    itemType: {
        type: Number
    },
    imageUrl: {
        type: String
    },
}, {collection: 'items'});

const FIND = mongoose.model('FIND', findSchema);

/*@return: all items from the database as a .json file.*/
app.get("/", function (req, res) {
    FIND.find().exec((a_error, items) => {
        if (a_error) {
            console.log(error);
            res.json({Error: error});
        } else {
            res.json(items);
        }
    })
});

app.post("/post", function (req, res) {
    const a_item = new FIND( {
        claimed: false,
        name: req.body.name,
        found_Date: req.body.found_Date,
        found_Location: req.body.found_Location,
        claim_Location: req.body.claim_Location,
        itemType: req.body.itemType,
        imageUrl: req.body.imageUrl,
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
})

app.delete("/delete", function (req, res) {
    FIND.findOneAndDelete({})
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })