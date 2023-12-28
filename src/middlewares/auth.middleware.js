import jwt from "jsonwebtoken";

export const authAdminRole = (req, res, next) => {
    try {
        const decode = jwt.decode(req.headers['authorization'].split(" ")[1])
        if (decode.role === "admin") {
            next();
        } else {
            return res.status(404).send({ message: "Unauthorized", error: undefined, data: undefined, status: false });
        }
    } catch (e) {
        // console.log("auth role: ", e)
        return res.status(404).send({ auth: "Unauthorized", error: e })
    }
}

export const authRole = (req, res, next) => {
    try {
        if (req.headers['authorization'].split(" ")[1]) {
            next();
        } else {
            return res.status(404).send({ message: "Unauthorized", error: undefined, data: undefined, status: false });
        }
    } catch (e) {
        // console.log("auth role: ", e)
        return res.status(404).send({ auth: "Unauthorized", error: e })
    }
}