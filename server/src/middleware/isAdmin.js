module.exports = function isAdmin(req, res, next) {
  const adminEmails = [
    'najiba.ahmed@g.bracu.ac.bd',
    'alio.das.avik@g.bracu.ac.bd',
    'rafiul.bari@g.bracu.ac.bd',
    'samia.rahman@g.bracu.ac.bd'
  ];

  if (!req.user || !req.user.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!adminEmails.includes(req.user.email)) {
    return res.status(403).json({ message: 'Admin access only' });
  }

  next();
};