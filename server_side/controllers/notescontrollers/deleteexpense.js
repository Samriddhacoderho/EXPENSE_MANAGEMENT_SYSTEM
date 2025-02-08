import expenseModel from "../../models/Expensemodel.js";

const deleteexpense = async (req, res) => {
  try {
    const result = await expenseModel.findById(req.body.id);
    if (result.user.toString() !== req.user.id) {
      return res.status(404).send("Deletion Not Allowed");
    }
    const deleted = await expenseModel.deleteOne({ _id: req.body.id });
    if (!deleted.deletedCount) {
      return res.status(404).send("Deletion Unsucessful");
    }
    res.send("Deletion Successful")
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export default deleteexpense;

