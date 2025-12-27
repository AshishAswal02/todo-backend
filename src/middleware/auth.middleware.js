import jwt from "jsonwebtoken"

export const verifyJWTtoken = (req, res, next) => {
  const token = req.cookies.token
  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.SECRET, (err) => {
    if (err) return res.sendStatus(401)
    next()
  })
}