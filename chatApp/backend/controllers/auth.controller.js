import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		

		const user = await User.find({ email });

		if (user) {
			
			return res.status(400).json({ error: "User already exists" ,user});
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			password: hashedPassword,
		});
         console.log(newUser);
		if (newUser) {
			// Generate JWT token here
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email
				
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}

	// try {
	// 	const { name, email, password } = req.body;
	// 	const user = await User.findOne({ email });
	// 	res.status(201).json({user});
	//     if(!user){
	// 		const salt = await bcrypt.genSalt(10);
	// 		const hashedPassword = await bcrypt.hash(password, salt);
	// 		const usercr= await User.create({
	// 			name,
	// 			email,
	// 			password:hashedPassword
	// 		})
	// 		res.status(201).json({usercr});
	// 		} else {
	// 			res.status(400).json({ error: "Invalid user data" });
	// 		}
	// 	}	
	
	// catch (error) {
	// 	console.log("Error in signup controller", error.message);
	// 	res.status(500).json({ error: "Internal Server Error" });
	// }
};

export const login = async (req, res) => {
	try{
       const {email,password}=req.body
	   const user = await User.findOne({ email });
	   if(!user){
		   return res.status(400).json({ error: "User does not exist" });
	   }
	   const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
	   if(!isPasswordCorrect){
		   return res.status(400).json({ error: "Invalid password" });
	   }
	   generateTokenAndSetCookie(user._id, res);
	   res.status(200).json({
		   _id: user._id,
		   name: user.name,
		   email: user.email
	   });
	}
	catch(error){
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
