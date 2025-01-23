import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    try {
        
        const token = req.headers.token;

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = { id: decoded.id };

        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized access', error: error.message });
    }
};

export default verifyToken;
