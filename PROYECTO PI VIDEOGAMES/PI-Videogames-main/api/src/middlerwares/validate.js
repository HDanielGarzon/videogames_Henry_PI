const validate =(req,res,next)=>{
    const {name, description, platforms, genres, rating, background_image, released}= req.body;
    if(!name) return res.status(400).json({error: "missing name"});
    if(!description) return res.status(400).json({error: "missing description"});
    if(!platforms) return res.status(400).json({error: "missing platforms"});
    if(!genres) return res.status(400).json({error: "missing genres"});
    if(!rating) return res.status(400).json({error: "missing rating"});
    if(!background_image) return res.status(400).json({error: "missing image"});
    if(!released) return res.status(400).json({error: "missing released"});
    next();
  }
  module.exports={validate}