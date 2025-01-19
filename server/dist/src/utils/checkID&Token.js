export function validateID(input) {
    // Check if input is a 24-character hex string
    if (typeof input === "string" && /^[a-fA-F0-9]{24}$/.test(input)) {
        return true;
    }
    // Check if input is a 12-byte Uint8Array
    if (input instanceof Uint8Array && input.length === 12) {
        return true;
    }
    // Check if input is an integer
    if (Number.isInteger(input)) {
        return true;
    }
    // If none of the above, it's invalid
    return false;
}
export const isJwtToken = (token) => {
    // Regular expression for JWT: three Base64URL parts separated by dots
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
    // Check if the token matches the regex
    if (!jwtRegex.test(token)) {
        return false;
    }
    else {
        return true;
    }
};
