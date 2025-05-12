import mongoose from 'mongoose';
const companySchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        },
        address: {
        type: String,
        required: true,
        },
        phone: {
        type: String,
        required: true,
        },
        email: {
        type: String,
        required: true,
        },
        website: {
        type: String,
        required: true,
        },
        domain: {
        type: String,   
        required: true,
        unique: true,
        },
    },
    { timestamps: true }
    );

    const Company = mongoose.model('Company', companySchema);
    export default Company;
