const resetPassword = function (link) {
    const html = `<html>
    <head>
        <style>
        </style>
    </head>
    <body>
        <p>Hi {{name}},</p>
        <p>You requested to reset your password.</p>
        <p> Please, click the link below to reset your password</p>
        <a href="https://{{link}}">Reset Password</a>
    </body>
</html>`
    const text = `
    You requested to reset your password. Click on the link to reset password:
    ${link}
If you did not request a password reset. This password reset is only valid for the next 1 hour.`;

return {
    html: html,
    text: text,
};
};

export default resetPassword;

