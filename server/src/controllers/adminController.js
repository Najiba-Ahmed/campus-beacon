const Item = require('../models/Item');
const Report = require('../models/Report');

exports.getDashboardData = async (req, res) => {
  try {
    const totalItems = await Item.countDocuments();
    const hiddenItems = await Item.countDocuments({ isHidden: true });
    const flaggedItems = await Item.countDocuments({ flagCount: { $gt: 0 } });
    const totalReports = await Report.countDocuments();

    const reportedItems = await Item.find({ flagCount: { $gt: 0 } })
      .sort({ flagCount: -1, createdAt: -1 });

    const reports = await Report.find()
      .sort({ createdAt: -1 })
      .populate('item', 'title postedByEmail flagCount isHidden status category');

    res.json({
      stats: {
        totalItems,
        hiddenItems,
        flaggedItems,
        totalReports
      },
      reportedItems,
      reports
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};

exports.hideItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.isHidden = true;
    await item.save();

    res.json({ message: 'Item hidden successfully', item });
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};

exports.unhideItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.isHidden = false;
    await item.save();

    res.json({ message: 'Item unhidden successfully', item });
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await Report.deleteMany({ item: item._id });
    await Item.findByIdAndDelete(req.params.itemId);

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};