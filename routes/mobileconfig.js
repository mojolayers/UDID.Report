
/*
* GET mobile config
*/

exports.paper_plane = function(req, res){

    /*

        !TODO: Connect to Device Observer
        TODO: 

    */

    res.set('Content-Type', 'text/html');
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    var tudid = query.udid;
    if (tudid && extractValidUdid(tudid)) // If it's in the query, store it and redirect (so the user doesn't see the UDID being sent in the URL)
    {
        res.cookie('newudid', query.udid, 
        { 
            maxAge: 1000*60*60*24*365,
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production'? true: false
        });
        res.redirect('/enrollment');
    }
    else
    {
        var cookie = req.cookies.newudid;
        if (cookie && extractValidUdid(cookie)) {
            // Found the cookie, let's render it
            // TODO: Connect to F7 UDID Page.
            // IDEA: Might be able to use the COOKIE to display it in the static rendered pages??
            // res.render('/udid', { udid: cookie, title: 'udid.fyi'}); // Render UDID Page via PUG
            res.redirect('/udid');
        }
        else {
            // No cookie, redirect back to home page
            res.redirect('/');
        }
    }
}
exports.validate = function(req, res){
    var udid = extractValidUdid(req.body.toString())

    if (udid) {
        res.redirect(301,'/enrollment?udid=' + udid);
    }
    else {
        res.status(400)
        res.send('Did not find a valid UDID in the body')
    }
};

function extractValidUdid (udid) {
    const match = udid.match(/(0000[\d]{4}-00[A-Fa-f\d]+)|([a-fA-F\d]{40})/);

    if (match && match.length > 0) {
        return match[0]
    }
    else {
        return null
    }
}
