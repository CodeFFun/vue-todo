import User from "../model/User.js"

class userController {

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.find({ email });
            if (!user) {
                res.status(404).json({ message: "User not found" });
            }
            if (user[0].password !== password) {
                res.status(400).json({ message: "Invalid password" });
            }
            res.json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    register = async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const newUser = await User.create({
                name,
                email,
                password
            });
            await newUser.save();
            res.json(newUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default userController;