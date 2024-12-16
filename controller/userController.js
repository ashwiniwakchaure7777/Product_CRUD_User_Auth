import { User } from "../models/userSchema.js";


export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, password,role } = req.body;
        if (!firstName || !lastName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ success: true, message: "Provide all required details" })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: true, message: "email already registered" });
        }

        const newUser = await User.create({firstName, lastName, email, phoneNumber, password,role});

        const token = newUser.generateToken();

        return res.status(200).json({ success: true, token, message: "User registered successfully" });

    } catch (err) {
        console.log(err);
       return res.status(500).json({ success: true, message: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).json({ success: false, message: "Provide all required details" })
        }

        const user = await User.findOne({ email });
        if (!user) { return res.status(203).json({ success: false, message: "User not registered" }); }

        const matchPassword = await user.comparePassword(password);
        if (!matchPassword) {
            return res.status(201).json({ success: false, message: "Input incorrect" });
        }
        const token = user.generateToken();
       

        res.status(200).json({ success: true, token,message: "User login successfully" });
    }catch(err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}