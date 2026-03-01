const Item = require('../models/Item');

exports.createItem = async (req, res) => {
  try {
    const { title, description, category, status, zone, sensitivity } = req.body;
    const item = new Item({ ...req.body, postedByEmail: req.user.email });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listItems = async (req, res) => {
  try {
    const { category, status } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    const items = await Item.find(filter).sort('-createdAt');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.postedByEmail !== req.user.email) return res.status(403).json({ message: 'Not authorized' });

    item.status = req.body.status;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
