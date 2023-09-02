import jwt from "jsonwebtoken"; 


const generateToken =(res,userId) => {
  // console.log(userId);
    const token = jwt.sign({ userId },process.env.JWT_SECRET,{  
        expiresIn: '30d'
        
    });
    // console.log(token);

    res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days 24 hours 60 mint 60*1000 sec 
  });
};

export default generateToken; 