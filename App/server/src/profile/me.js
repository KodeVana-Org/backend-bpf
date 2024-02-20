const User = require('../models/user.Model');
const Member = require('../models/member.Model')


exports.Profile = async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            });
        }
        
        let member = null;

        if (user.userType === 'member') {
            member = await Member.findOne({ user: userId });
            
            if (!member) {
                return res.status(404).json({ message: 'Member not found.' });
            }
        }

        return res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            user,
            member
        });
    } catch (error) {
        console.error('Error fetching profile/me:', error);
        return res.status(500).json({
            success: false,
            message: 'Error while fetching profile/me'
        });
    }
};
