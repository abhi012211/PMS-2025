import Company from '../models/company.js';
import User from '../models/User.js';

export const registerCompany = async (req, res) => {
  const { companyName,domain,adminName,adminEmail, adminPassword } = req.body;
  try {
     const exist = await Company.findOne({ domain });
  if (exist) {
    return res.status(400).json({
      message: 'Company already exists',
    });
  }
    const company = new Company({
      name:companyName,
        domain,
    });
    await company.save();
    const admin = new User({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: 'Admin',
      companyId: company._id,
    });
    await admin.save();
    res.status(201).json({
      message: 'Company created successfully',
      companyId: {
        id: company._id,
        name: company.name,
        email: company.email,
        adminId: admin._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
}