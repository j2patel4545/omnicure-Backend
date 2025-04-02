import User from '../Models/UserModule.js'

export const DeleteUser = async(req,res)=>{
        const {id}= req.params;
        try {
            const user = await User.findById(id)
            if (!user) {
                return res.status(400).json({message:"User NOT Found Invalid User"});
            }
            const deletedUser = await User.findByIdAndDelete(id);
            return res.status(201).json({message:"UserDeleted Success,User deleted is:",deletedUser})
        } catch (error) {
            return res.status(500).json({message:"Server Error..1"},error);
        }
}

export const UpdateUser = async (req, res) => {
    const { id } = req.params;
    const { email, Address, Username } = req.body;

    try {
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ message: "User Not Found..!" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { email, Address, Username },
            { new: true, runValidators: true } // Returns updated user and applies validation
        );

        return res.status(200).json({ message: "User Updated Successfully!", updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error: User Not Updated..!" });
    }
};
