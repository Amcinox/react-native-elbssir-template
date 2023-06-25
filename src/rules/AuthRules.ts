import { RulesGroup } from "../types"
import regexPattern from "../utils/regexPattern";


const AuthRules: RulesGroup = {
    username: {
        required: "Username required",
        minLength: {
            value: 3,
            message: "Username should be between 3 and 24 characters",
        },
        maxLength: {
            value: 24,
            message: "Username should be between 3 and 24 characters",
        },
        pattern: {
            value: regexPattern.LettersAndSpacesAndDashesAndNumbers,
            message:
                "Username should contains only letters, numbers, spaces and dashes",
        },
    },
    password: {
        required: "Password required",
        minLength: {
            value: 8,
            message: "Password should be more than 8 characters",
        },
        pattern: {
            value: regexPattern.PASSWORD,
            message:
                "Password must have an uppercase letter, a lowercase letter, and a number.",
        },
    },
}

export default AuthRules