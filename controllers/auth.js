import User from '../models/User.js';
import {generateToken} from '../services/auth.js'

export const login=async (req, res,next) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email}).select('+password');
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid password'
            });
        }
        const {token, refreshToken} = generateToken(user);
        res.status(200).json({
            message: 'Login successful',
            ...token,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                companyId: user.companyId
            }
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}
export const register=async (req, res) => {
    const {name, email, password, role, companyId} = req.body
    try {
        const user = await User.create({
            name,
            email,
            password,
            role,
            companyId
        });
        const {token, refreshToken} = generateToken(user);
        res.status(201).json({
            message: 'User created successfully',
            token,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                companyId: user.companyId
            }
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}
export const refreshToken=async (req, res,next) => {
    const {refreshToken} = req.body;
    if (!refreshToken) {
        return res.status(401).json({
            message: ' token is required'
        });
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                message: 'Invalid refresh token'
            });
        }
        const {token, newRefreshToken} = generateToken(user);
        res.status(200).json({
            message: 'Token refreshed successfully',
            token,
            refreshToken: newRefreshToken
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}