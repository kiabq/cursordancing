export default function roomhash() {
    const chars = "abcdefghijklmnopqrstuvwrxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < 6; i++) {
        const char = Math.floor(Math.random() * 62);
        code += chars.charAt(char);
    }

    return code;
}