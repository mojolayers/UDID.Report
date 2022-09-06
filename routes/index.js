
/*
 * GET home page.
 */

/*
    var ua = require('useragent');
    if (ua.is(req.headers['user-agent']).mobile_safari) {
        if (req.cookies.newudid) {
            res.redirect('/enrollment');
        }
        else {
            res.render('index');
        }
    }
    else {
        res.render('index-notios');
    }
*/

exports.index = function(req, res){
    if (req.cookies.newudid) {
        res.redirect('/enrollment');
    }
    else {
        res.redirect('/'); // ?TODO: /#!/udid/
    }
};