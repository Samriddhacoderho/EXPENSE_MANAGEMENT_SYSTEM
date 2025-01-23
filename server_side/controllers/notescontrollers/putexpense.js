import expenseModel from "../../models/Expensemodel.js";

const putexpense = async (req, res) => {
  try {
    const result = await expenseModel.findById(req.params.id);
    if (result.user.toString() !== req.user.id) {
      return res.status(404).send("Invalid Expense Access");
    }
    const update = await expenseModel.updateOne(
      { _id: req.params.id },
      req.body,
      { runValidators: true }
    );
    if (!update.modifiedCount) {
      return res.status(404).send("Updation Failed");
    }
    res.send("Updation Successful");
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export default putexpense;
