module.exports = function verifyEmail(req, res, next) {
  const email = req.header('x-user-email');
  const allowed = process.env.ALLOWED_EMAIL_DOMAIN;
  if (!email) return res.status(401).json({ message: 'Missing X-User-Email header' });

  const domain = email.split('@')[1] || '';
  if (domain.toLowerCase() !== allowed.toLowerCase()) {
    return res.status(403).json({ message: 'Email not allowed' });
  }

  req.user = { email };
  next();
};
