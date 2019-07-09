const express = require("express");
const router = express.Router();

const Url = require("../models/URL");

router.get("/:code",async (req,resp) => {
    try {
        const url = await Url.findOne({urlCode: req.params.code })

        if(url){ 
            return resp.redirect(url.longUrl)
        }else {
            return resp.status(404).json("no url found")
        }
    }catch(err) {
        resp.status(500).json("server err")
    }
})

module.exports = router;