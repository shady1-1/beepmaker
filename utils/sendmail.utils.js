const nodemailer = require("nodemailer");
exports.sendMailReset = async (_to, _link, _title) => {
  const to = _to;
  const verificationUrl = _link;
  const mailTemplate = `<!DOCTYPE html>
	<html>
	<head>
			<meta charset="utf-8">
			<meta http-equiv="x-ua-compatible" content="ie=edge">
			<title>Email Confirmation</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<style type="text/css">
					@media screen {
							body,
							table,
							td,
							a {
									-ms-text-size-adjust: 100%;
									-webkit-text-size-adjust: 100%;
							}
							table,
							td {
									mso-table-rspace: 0pt;
									mso-table-lspace: 0pt;
							}
							img {
									-ms-interpolation-mode: bicubic;
							}
							a[x-apple-data-detectors] {
									font-family: inherit !important;
									font-size: inherit !important;
									font-weight: inherit !important;
									line-height: inherit !important;
									color: inherit !important;
									text-decoration: none !important;
							}
							div[style*="margin: 16px 0;"] {
									margin: 0 !important;
							}
							body {
									width: 100% !important;
									height: 100% !important;
									padding: 0 !important;
									margin: 0 !important;
							}
							table {
									border-collapse: collapse !important;
							}
							a {
									color: #1a82e2;
							}
							img {
									height: auto;
									line-height: 100%;
									text-decoration: none;
									border: 0;
									outline: none;
							}
			</style>
	</head>
	<body style="background-color: #e9ecef;">
			<div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"></div>
			<table border="0" cellpadding="0" cellspacing="0" width="100%">
					<tr>
							<td align="center" bgcolor="#e9ecef">
									<!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"> <![endif]-->
									<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
											<tr>
													<td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
															<h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Reset Password</h1>
													</td>
											</tr>
									</table>
							</td>
					</tr>
			</table>
			<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
					<tr>
							<td align="center" bgcolor="#e9ecef">
									<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
											<tr>
													<td align="center" valign="top" width="600">
															<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
																	<tr>
																			<td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
																					<p style="margin: 0;">Tap the button below to reset your password. If you didn't made this request you can safely delete this email.</p>
																			</td>
																	</tr>
																	<tr>
																			<td align="left" bgcolor="#ffffff">
																					<table border="0" cellpadding="0" cellspacing="0" width="100%">
																							<tr>
																									<td align="center" bgcolor="#ffffff" style="padding: 12px;">
																											<table border="0" cellpadding="0" cellspacing="0">
																													<tr>
																															<td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="${verificationUrl}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Reset password</a> </td>
																													</tr>
																											</table>
																									</td>
																							</tr>
																					</table>
																			</td>
																	</tr>
																	<tr>
																			<td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
																					<p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
																					<p style="margin: 0; word-break: break-all;"><a href="${verificationUrl}" target="_blank">${verificationUrl}</a></p>
																			</td>
																	</tr>
																	<tr>
																			<td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf"> </td>
																	</tr>
															</table>
													</td>
											</tr>
									</table>
							</td>
					</tr>
					<tr>
							<td align="center" bgcolor="#e9ecef" style="padding: 24px;">
									<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
											<tr>
													<td align="center" valign="top" width="600"> </td>
											</tr>
									</table>
							</td>
					</tr>
			</table>
	</body>
	</html>`;

  try {
    const { MAIL_SERVICE, MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD } =
        process.env;

    const transporter = nodemailer.createTransport({
      service: MAIL_SERVICE,
      port: MAIL_PORT,
      secure: false,
      host: MAIL_HOST,
      auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: MAIL_USERNAME,
      to,
      subject: _title,
      text: _title,
      html: mailTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (e) {
    console.log(e);
  }
};

exports.sendMail = async (_to, _link, _title) => {
  const to = _to;
  const verificationUrl = _link;
  const mailTemplate = `<!DOCTYPE html>
	<html>
	<head>
			<meta charset="utf-8">
			<meta http-equiv="x-ua-compatible" content="ie=edge">
			<title>Email Confirmation</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<style type="text/css">
					@media screen {
							body,
							table,
							td,
							a {
									-ms-text-size-adjust: 100%;
									-webkit-text-size-adjust: 100%;
							}
							table,
							td {
									mso-table-rspace: 0pt;
									mso-table-lspace: 0pt;
							}
							img {
									-ms-interpolation-mode: bicubic;
							}
							a[x-apple-data-detectors] {
									font-family: inherit !important;
									font-size: inherit !important;
									font-weight: inherit !important;
									line-height: inherit !important;
									color: inherit !important;
									text-decoration: none !important;
							}
							div[style*="margin: 16px 0;"] {
									margin: 0 !important;
							}
							body {
									width: 100% !important;
									height: 100% !important;
									padding: 0 !important;
									margin: 0 !important;
							}
							table {
									border-collapse: collapse !important;
							}
							a {
									color: #1a82e2;
							}
							img {
									height: auto;
									line-height: 100%;
									text-decoration: none;
									border: 0;
									outline: none;
							}
			</style>
	</head>
	<body style="background-color: #e9ecef;">
			<div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"></div>
			<table border="0" cellpadding="0" cellspacing="0" width="100%">
					<tr>
							<td align="center" bgcolor="#e9ecef">
									<!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"> <![endif]-->
									<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
											<tr>
													<td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
															<h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
													</td>
											</tr>
									</table>
							</td>
					</tr>
			</table>
			<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
					<tr>
							<td align="center" bgcolor="#e9ecef">
									<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
											<tr>
													<td align="center" valign="top" width="600">
															<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
																	<tr>
																			<td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
																					<p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account you can safely delete this email.</p>
																			</td>
																	</tr>
																	<tr>
																			<td align="left" bgcolor="#ffffff">
																					<table border="0" cellpadding="0" cellspacing="0" width="100%">
																							<tr>
																									<td align="center" bgcolor="#ffffff" style="padding: 12px;">
																											<table border="0" cellpadding="0" cellspacing="0">
																													<tr>
																															<td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="${verificationUrl}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verify email address</a> </td>
																													</tr>
																											</table>
																									</td>
																							</tr>
																					</table>
																			</td>
																	</tr>
																	<tr>
																			<td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
																					<p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
																					<p style="margin: 0; word-break: break-all;"><a href="${verificationUrl}" target="_blank">${verificationUrl}</a></p>
																			</td>
																	</tr>
																	<tr>
																			<td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf"> </td>
																	</tr>
															</table>
													</td>
											</tr>
									</table>
							</td>
					</tr>
					<tr>
							<td align="center" bgcolor="#e9ecef" style="padding: 24px;">
									<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
											<tr>
													<td align="center" valign="top" width="600"> </td>
											</tr>
									</table>
							</td>
					</tr>
			</table>
	</body>
	</html>`;

  try {
    const { MAIL_SERVICE, MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD } =
        process.env;

    const transporter = nodemailer.createTransport({
      service: MAIL_SERVICE,
      port: MAIL_PORT,
      secure: false,
      host: MAIL_HOST,
      auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: MAIL_USERNAME,
      to,
      subject: _title,
      text: _title,
      html: mailTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (e) {
    console.log(e);
  }
};
