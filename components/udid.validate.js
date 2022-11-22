/* Export UDID.Validate() */
export function validate (req, res){
    // T-21 Validate UDID
    require('./udid.extract.js').extract();
    
}

module.exports = { validate };