const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const config  = require("config");


const Url =  require("../models/URL");

// @route POST  / api / url / shorten

router.post("/shorten", async (req, resp) => {
    const {longURL} = req.body ;
    const baseURL = config.get("baseUrl");

    if(!validUrl.isUri(baseURL)){
        return resp.status(401).json("invalid base url");
    }

    const urlCode = shortid.generate();

    if(validUrl.isUri(longURL)) { 
        try{
            let url = await Url.findOne({longURL});

            if(url) { 
                 resp.json(url);
            }else {
                const shortUrl = baseUrl + "/" + urlCode;

                url = new Url({
                    longURL,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();

                res.json(url);


            }
        } catch (err){
            console.log(err);
            res.status(500).json("server error");
        }
    }else {
        res.status(401).json("invalid long url");
    }
});

module.exports = router;