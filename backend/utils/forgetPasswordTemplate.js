
export const forgetPasswordTemplate = (resetPasswordUrl) => {
return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #fff; color: #000;">
  <h2 style="color: #000; text-align: center;">Reset Your Password</h2>
  <p style="font-size: 16px; color: #555;">Dear User,</p>
  <p style="font-size: 16px; color: #555;">You requested to reset your password. Please click the button below to proceed:</p>
  <div style="text-align: center; margin: 20px 0;">
    <a href="${resetPasswordUrl}" 
       style="display: inline-block; font-size: 16px; font-weight: bold; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 5px; background-color: #007ff7ff;">
      Reset Password
    </a>
  </div>
  <p style="font-size: 16px; color: #555;">If you did not request this, please ignore this email. The link will expire in 15 minutes.</p>
  <p style="font-size: 16px; color: #555;">If the button above doesn’t work, copy and paste the following URL into your browser:</p>
  <p style="font-size: 16px; color: #000; word-wrap: break-word;">${resetPasswordUrl}</p>
  <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #777;">
    <p>Thank you,<br>Ecommerce Team</p>
    <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
  </footer>
</div>
`
}