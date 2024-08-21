const express=require('express');
const router=express.Router();
const {getStudents,addStudent,updatestudent,deletestudent}=require('../controller/studentcontroller');


router.get('/',getStudents);
router.post('/insertstudent',addStudent);
router.put('/updatestudent/:id',updatestudent)
router.delete('/deletestudent/:id',deletestudent)
module.exports={
    router,
}