const RFP = require("../models/RFP");
const RFPView = async (req, res) => {
  try {
    const rfps = await RFP.find();
    if(rfps.length===0){
        res.status(400).json({response:"No Rfps present"})
    }
    res.status(200).json({
        response:"sucess",RFPs:rfps
    })
  } catch (err) {
    console.log(err);
  }
};
module.exports = RFPView;
