import User from "../models/User.js";

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const { companyId } = req.user;
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already exist" });
    const user = new User({ name, email, password, companyId, role });
    // const token=await user.generateToken()
    await user.save();
    res.status(201).json({ message: "User Created", userId: user._id });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) =>{
    try {
        const users = await User.find().populate('companyId').populate('role');
        res.status(200).json(users);
        } catch (error) {
            next(error);
            }
}
export const listUsers=async(req,res,next)=>{
    try{
        const {page=1,limit=10}=req.query;
        const {companyId}=req.user;
        const users=await User.find({companyId}).select('-password').skip((page-1)*limit).limit(Number(limit))
        const total=await User.countDocuments({companyId})
        res.status(200).json({users,total,page:Number(page),pages:Math.ceil(total/limit)})
    }
    catch(err){
        next(err)
    }
}
