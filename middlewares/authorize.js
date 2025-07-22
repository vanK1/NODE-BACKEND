import jwt from 'jsonwebtoken';

const authorize = (allowedRoles) => (req, res, next) => {
// const token = req.headers.authorization?.split(' ')[1];
const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
}
try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
    }
    next(); 

}catch (error) {
    console.error("Authorization error:", error);
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Access token has expired" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

export default authorize;