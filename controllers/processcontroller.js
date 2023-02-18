const connection = require("../config/db_config");


const addNew = (req, res) => {
  res.render("addNew");
};


const addNewpost = (req, res) => {
    const fname = req.body.firstname;
    const lname = req.body.lastname;
    const salary = req.body.salary;
    const description = req.body.description;
    const email = req.body.email;

    if(email!=="" && lname!=="" && salary!=="" && description!=="" && fname!==""){
        const query = `SELECT * FROM employee_table WHERE email = '${email}';`;
        connection.query(query, (err, data)=>{
            if(err) throw err.message;
            if(data.length>0){
                req.flash('error', 'Email already exists');
                res.redirect('/addNew');
            }
            else{
                const query = `INSERT INTO employee_table(first_name, last_name, salary, job_description, email, added_at) VALUES ("${fname}", "${lname}", "${salary}","${description}", "${email}", NOW());  `;
                connection.query(query, (err)=>{                                                                                   
                    if(err) {
                        req.flash('error', 'Oops! Something went wrong');
                        console.log(err.message);
                        res.redirect('/viewAll');
                    } 
                    else{
                        req.flash('success', 'New employee added successfully');
                        res.redirect('/viewAll');
                    }
                });
            };    

        });

    
    }else{
        if(fname==""){
            req.flash('error' , 'Please enter first name');
            res.redirect('/addNew');
        }
        if(lname==""){
            req.flash('error' , 'Please enter last name');
            res.redirect('/addNew');
        }
        if(salary==""){
            req.flash('error' , 'Please enter salary');
            res.redirect('/addNew');

        }
        if(description==""){
            req.flash('error', 'please enter job description');
            res.redirect('/addNew');

        }
        if(email==""){
            req.flash('error' , 'Please enter an email address');
            res.redirect('/addNew');

        }
    }    

};


const viewAll = (req, res) => {
    const query = `SELECT * FROM employee_table;`;

    connection.query(query, (err, result)=>{

     if (err) throw err.message;
        else {
          obj = {print: result};
        
     }
     res.render("viewAll", obj);
    })
};
const edit = (req, res) => {
    res.render("edit");


};
const update  = (req, res) => {
    const id = global.id;
    const fname = req.body.firstname;
    const lname = req.body.lastname;
    const salary = req.body.salary;
    const description = req.body.description;
    const email = req.body.email;
    
    if(email!=="" && lname!=="" && salary!=="" && description!=="" && fname!==""){
        
        const query = `UPDATE  employee_table 
            SET 
                first_name = "${fname}", 
                last_name ="${lname}", 
                salary =    "${salary}", 
                job_description = "${description}", 
                email = "${email}", 
                updated_at = NOW()
            WHERE employee_id ="${id}";`;  

        
        connection.query(query, (err)=>{                                                                                   
            if(err) {
                req.flash('error', 'Oops! Something went wrong');
                console.log(err.message);
                res.redirect('/edit');
            } 
            else{
                req.flash('success', 'Employee updated successfully');
                res.redirect('/viewAll');
            };
        });
    }else{
        if(fname==""){
            req.flash('error' , 'Please enter first name');
            res.redirect('edit');
        }
        if(lname==""){
            req.flash('error' , 'Please enter last name');
            res.redirect('/edit');
        }
        if(salary==""){
            req.flash('error' , 'Please enter salary');
            res.redirect('/edit');

        }
        if(description==""){
            req.flash('error', 'please enter job description');
            res.redirect('/edit');

        }
        if(email==""){
            req.flash('error' , 'Please enter an email address');
            res.redirect('/edit');

        }

    }    
};

    
const deleteConfirmation = (req, res) => {
    res.render("delete");
    global.id = req.query.id;

};
const deletebyId = (req,res)=>{
    const id = global.id;
    console.log(id);

    const query = `DELETE FROM employee_table WHERE employee_id = ${id}`;
    connection.query(query, (err)=>{
        if(err){
            req.flash('error', 'Oops! Something went wrong');
            console.log(err.message);

        }
        else{
            req.flash('success', 'Employee deleted successfully');
            res.redirect('/viewAll');
        }
    })
};


module.exports = {
  viewAll,
  addNew,
  addNewpost,
  edit,
  update,
  deleteConfirmation,
  deletebyId,
  
  
};
