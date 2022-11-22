/* Route for /validate/ */
exports.validate = function(req, res){
    var udid = require('../components/udid.extract.js').extract(req.body.toString())

    if (udid) {
        res.redirect(301,'/paper_plane?udid=' + udid);
    }
    else {
        res.status(400)
        res.send('Did not find a valid UDID in the body')
    }
};