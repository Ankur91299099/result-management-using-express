//importing student model
const Student = require('../models/student');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../services/auth');


const teacher_login_get = (req, res) => {
    res.render("teacher/teacherLogin", { message: " " });
};

const teacher_login_post = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ where: { email, password } });
        if (!user) {
            res.render("teacher/teacherLogin", {
                message: "Invalid Username or Password"
            })
        }
        else {
            const sessionId = uuidv4();
            setUser(sessionId, user);
            res.cookie("uid", sessionId);
            res.render("teacher/option", { message: "Logged in successfully." })
        }
    }
    catch (error) {
        // res.render('/')
    }
};

const teacher_viewall_get = async (req, res) => {
    const allStudents = await Student.findAll()
    res.render("teacher/viewall", { student: allStudents, message: "hello" })
};

const teacher_edit_get = async (req, res) => {

    const user = await Student.findOne({
        where: {
            roll_no: req.params.id
        }
    })
    res.render("teacher/edit", { user: user })
};

const teacher_edit_post = async (req, res) => {
    const user = await Student.update({
        name: req.body.name,
        date_of_birth: req.body.dob,
        score: req.body.score
    }, {
        where: {
            roll_no: req.body.roll
        }
    })
    const allStudents = await Student.findAll()

    res.render("teacher/viewall", { student: allStudents, message: "Edited successfully" });
};

const teacher_delete_get = async (req, res) => {

    await Student.destroy({ where: { roll_no: req.params.id } })
    const allStudents = await Student.findAll()
    res.render("teacher/viewall", { student: allStudents, message: "Deleted successfully" })
};

const teacher_option_get = (req, res) => {
    res.render("teacher/option", { message: "hello" })
};

const teacher_add_get = (req, res) => {
    res.render("teacher/addstudent", { message: " " });
};

const teacher_add_post = async (req, res) => {
    const singleStudent = new Student({
        name: req.body.name,
        roll_no: req.body.roll,
        date_of_birth: req.body.dob,
        score: req.body.score
    })
    try {
        const newStudent = await singleStudent.save();
        const allStudents = await Student.findAll()
        res.render("teacher/viewall", { student: allStudents, message: "Added successfully" })
    } catch {
        const allStudents = await Student.findAll()
        res.render("teacher/addstudent", { message: "Rollno. already exist" })
    }
};

//exporting teacher controller functions
module.exports = {
    teacher_login_get,
    teacher_login_post,
    teacher_viewall_get,
    teacher_edit_get,
    teacher_edit_post,
    teacher_delete_get,
    teacher_add_post,
    teacher_add_get,
    teacher_option_get
}


