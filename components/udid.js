function UDID() {
    this.id = "0";
}

UDID.prototype.extract = function(str) {
    return require('./udid.extract.js').extract(str);
};

UDID.prototype.validate = function (req, res) {
    return require('./udid.validate.js').validate(req, res);
}