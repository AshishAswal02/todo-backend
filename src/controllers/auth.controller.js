import { createUser, findUserByEmail, validateUser } from "../services/auth.service.js"
import { signToken } from "../utils/jwt.js"

export const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body
        if (!email || !password) res.status(400).json({ message: "Email and password are mandatory" })

        if (await findUserByEmail(email)) {
            return res.status(409).json({ message: "User already exists" })
        }

        await createUser(req.body)

        let token
        try {
            token = signToken({ email, name })
        } catch (error) {
            return res.status(500).json({ message: "Token generation failed" })
        }

        res.cookie("token", token, {
            httpOnly: true,
            path: "/",
            secure: true,
            sameSite: "none"
        })

        res.status(201).json({
            message: "User registered successfully",
            userInfo: { name, email },
        })

    } catch (error) {
        console.log('error :>> ', error);
        res.status(500).json({ message: 'somethning went wrong' })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password, name } = req.body
        if (!email || !password) res.status(400).json({ message: "Email and password are mandatory" })

        const user = await validateUser(req.body)
        if (!user) return res.status(404).send({ message: "Invalid credentials" })

        let token
        try {
            token = signToken({ email, name })
        } catch (error) {
            return res.status(500).json({ message: "Token generation failed" })
        }

        res.cookie("token", token, {
            httpOnly: true,
            path: "/",
            secure: true,
            sameSite: "none"
        })

        res.status(200).json({
            message: "Login successfully",
            userInfo: { name, email },
        })
    } catch (error) {
        console.log('error :>> ', error);
        res.status(500).json({ message: 'somethning went wrong' })
    }

}

export const logout = (_, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
    })
    res.status(200).json({ message: "Logged out successfully" })
}


