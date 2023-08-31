//importing student model
const Student = require('../models/student');

const student_login_get = (req, res) => {
  res.render("student/login", { message: " " });
};

const student_login_post = async (req, res) => {
  const Sturoll = req.body.roll;
  const DOB = req.body.dob;
  const individualStudent = await Student.findOne({
    where: {
      roll_no: Sturoll,
      date_of_birth: DOB
    }
  })
  if (!individualStudent) {
    res.render("student/login", {
      message: "Invalid Credentials"
    })
  }
  res.render("student/view", { one: individualStudent, message: "Logged In Successfully" });
};

//exporting student controller functions
module.exports = {
  student_login_get,
  student_login_post
}