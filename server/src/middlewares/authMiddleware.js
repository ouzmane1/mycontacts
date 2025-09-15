import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {

    const tokenAuth = req.headers.authorization;
    if (!tokenAuth) {
        return res.status(401).json({ message: "Accès refusé : token manquant" });
    }
    const token = tokenAuth.split(' ')[1];
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Accès refusé : token invalide" });
    }
}

export default authMiddleware;