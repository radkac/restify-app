"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const conf = require("../config");
exports.jwtMiddleware = (deps) => {
    return async (req, res, next) => {
        if (!deps.exclusions.includes(req.href())) {
            const token = req.headers['x-access-token'];
            if (!token) {
                res.send(403, { error: 'Token is not valid' });
                return false;
            }
            try {
                req.decoded = jwt.verify(token, conf.JWT_SECRET);
            }
            catch (error) {
                res.send(403, { error: 'Token is not autenticated' });
                return false;
            }
            // await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            //   if (error) {
            //     res.send(403, { error: 'Token is not autenticated' })
            //   } else {
            //     req.decoded = decoded
            //   }
            // })
        }
        next();
        return false;
    };
};
//# sourceMappingURL=jwtMiddleware.js.map