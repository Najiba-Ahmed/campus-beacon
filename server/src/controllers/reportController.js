const Item = require('../models/Item');
const Report = require('../models/Report');
const Notification = require('../models/Notification');

const REPORT_THRESHOLD = 3;

exports.reportItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { reason } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.postedByEmail === req.user.email) {
      return res.status(400).json({ message: 'You cannot report your own post' });
    }

    const existingReport = await Report.findOne({
      item: itemId,
      reportedByEmail: req.user.email
    });

    if (existingReport) {
      return res.status(400).json({ message: 'You have already reported this item' });
    }

    const report = await Report.create({
      item: itemId,
      reportedByEmail: req.user.email,
      reason: reason || ''
    });

    item.flagCount += 1;

    let thresholdReached = false;

    if (item.flagCount >= REPORT_THRESHOLD) {
      item.isHidden = true;
      thresholdReached = true;

      await Notification.create({
        userEmail: item.postedByEmail,
        message: `Your post "${item.title}" has been hidden after receiving multiple suspicious reports.`
      });
    }

    await item.save();

    res.status(201).json({
      message: thresholdReached
        ? 'Report submitted. Threshold reached, post hidden.'
        : 'Report submitted successfully.',
      report,
      item
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};