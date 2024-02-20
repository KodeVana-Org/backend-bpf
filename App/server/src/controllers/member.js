const User = require('../models/user.Model');
const Member = require('../models/member.Model');

exports.Join = async (req, res) => {
    try {
        const { firstName, lastName, location } = req.body;
        const userId = req.user.id;

        if (!firstName || !lastName || !location) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if the provided user ID exists in the User collection
        const existingUser = await User.findById(userId);

        if (existingUser) {
            // Check if the user is already a member
            if (existingUser.userType === 'member') {
                return res.status(400).json({ message: 'User is already a member.' });
            }

            // User exists, update as member
            existingUser.userType = 'member';

            // Create a new member with the provided details
            const member = new Member({
                firstName,
                lastName,
                location,
                user: userId // Set the user ID for the member
            });

            // Save the member
            await member.save();

            // Update the user's member field with the new member's ID
            existingUser.members = member._id;

            // Save the updated user
            await existingUser.save();

            return res.status(200).json({ message: 'User joined successfully as a member.' });
        } else {
            return res.status(404).json({ message: 'User not found.' });
        }

    } catch (error) {
        console.error('Error joining:', error);
        return res.status(500).json({ error: 'Failed to join.' });
    }
};
