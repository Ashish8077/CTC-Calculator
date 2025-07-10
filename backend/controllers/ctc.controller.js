import { calcaluteCTCBreakdown } from "../utils/ctc.util.js";

export const calculateCTC = async (req, res) => {
  try {
    const {
      ctc,
      variablePay,
      isEpfApplicable,
      isPtApplicable,
      salaryBreakout,
    } = req.body;

    const ctcData = calcaluteCTCBreakdown(
      ctc,
      variablePay,
      isEpfApplicable,
      isPtApplicable,
      salaryBreakout
    );

    return res.status(200).json({ success: true, data: ctcData });
  } catch (error) {
    console.log(`Error in calculateCTC controller : ${error.message}`);
    return res.status(500, { success: false, error: "Internal Server Error" });
  }
};
