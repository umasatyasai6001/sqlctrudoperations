
const {mysqlpool}=require('../db');
const getStudents=async(req,res)=>{
    try{
    const data=await mysqlpool.query('select * from studentinfo ');
    // res.json('data:',data);
    res.send(data[0]);
    }
    catch(err){
        console.log('error getting from studentinfo table',err);
    }

}
const addStudent = async (req, res) => {
    try {
        const { id, name, roll_no, fees, class: studentClass, medium } = req.body;

        // Use parameterized query to prevent SQL injection
        const query = `INSERT INTO studentinfo (id, name, roll_no, fees, class, medium) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [id, name, roll_no, fees, studentClass, medium];

        const [response] = await mysqlpool.query(query, values);
        res.send('Student added successfully');
    } catch (err) {
        console.error('Error adding student to studentinfo table', err);
        res.status(500).send('An error occurred while adding the student');
    }
}
const updatestudent=async(req,res)=>{
    try {
        const id = req.params.id;
        console.log('id',id);
        const { name, roll_no, fees, class: studentClass, medium } = req.body;
        const query = `UPDATE studentinfo SET name = ?, roll_no = ?, fees = ?, class = ?, medium = ? WHERE id = ?`;
        const values = [name, roll_no, fees, studentClass, medium, id];
        const [result] = await mysqlpool.query(query, values);
        
        if (result.affectedRows > 0) {
            // res.send('Student updated successfully',result);
            res.send({
                message:'student updated successfully',
                data:result
            })
        } else {
            res.status(404).send('Student not found');
        }
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).send('An error occurred while updating the student');
    }
}  
    const deletestudent=async(req,res)=>{
        try{
            const id=req.params.id;
            const query=`delete from studentinfo where id=?`;
            const [result]=await mysqlpool.query(query,id);
            if(result.affectedRows>0){
                res.send('student deleted successfully');
            }
            else{
                res.send('student not found');
            }

        }
        catch(err){
            console.error(`error deleting student`,err);
        }

    }
    





module.exports={
    getStudents,
    addStudent,
    updatestudent,
    deletestudent,
}