// Requiring our models and passport as we've configured it
const db = require("../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const passport = require("../config/passport");

module.exports = function(server) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  server.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  server.post("/api/signup", (req, res) => {
    console.log("Signup")
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      isManager: req.body.isManager,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        // If validation Fails
        console.log(err)
        // res.status(401).json(err);
      });
  });

  // Route for logging user out
  server.get("/logout", (req, res) => {
    console.log(req.user)
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  server.get("/api/user_data", (req, res) => {
    console.log(req.user)
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        isManager: req.user.isManager,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        address: req.user.address,
        phonenumber: req.user.phonenumber,
        assignedJob: req.user.assignedJob,
        completedJobs: req.user.completedJobs,
        dob: req.user.dob,
        gender: req.user.gender,
        userLat: req.user.userLat,
        userLng: req.user.userLng,
        pingTime: req.user.pingTime,
        startTime: req.user.startTime

      });
    }
  });

  // Api Route that listens for a put request to update the user's profile
  server.put("/api/userprofile", (req, res) => {
    console.log("HEY", req.body)
    db.User.update({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      dob: req.body.dob,
      gender: req.body.gender
    }, {
      where: {
        id: req.body.id
      }
    }).catch(error => console.log("DB ERROR", error))
  });

  // Api route that listens for a put request to update the users contact details
  server.put("/api/usercontact", (req, res) => {
    db.User.update({
      id: req.body.id,
      address: req.body.address,
      email: req.body.email,
      phonenumber: req.body.phonenumber
    }, {
      where: {
        id: req.body.id
      }
    })
      .catch(error => console.log("DB ERROR", error))
  });

  // a Get request to get all information of all users
  server.get("/api/users", (req, res) => {
    db.User.findAll({})
      .then(result => res.json(result))
      .catch(error => console.log(error))
  });

  // A post request that finds user information that matches the parsed in information
  server.post("/api/workerid", (req, res) => {
    db.User.findAll({
      where: {
        firstname: req.body.firstname
      }
    })
    .then(result => res.json(result))
    .catch(error => console.log(error))
  });

  // A post request that finds User information with the id parsed in
  server.post("/api/workername", (req, res) => {
    db.User.findAll({
      where: {
        id: req.body.id
      }
    })
    .then(result => res.json(result))
    .catch(error => console.log(error))
  });

  // A put request that updates the user's last known location
  server.put("/api/location", (req, res) => {
    db.User.update({
      userLat: req.body.userLat,
      userLng: req.body.userLng,
      pingTime: req.body.pingTime
    }, {
      where: {
        id: req.body.id
      }
    })
      .then(result => res.json(result))
      .catch(error => console.log("DB ERROR", error))
  });

  server.put("/api/startjob", (req, res) => {
    db.User.update({
      startTime: req.body.startTime,
      userLng: req.body.userLng,
      userLat: req.body.userLat
    }, {
      where: {
        id: req.body.id
      }
    })
      .catch(error => console.log("DB ERROR", error))
  });

  server.put("/api/endJob", (req, res) => {
    db.Job.update({
      completionDate: Date.now(),
      inProgress: false
    }, {
      where: {
        id: req.body.id
      }
    })
      .catch(error => console.log("DB ERROR", error))
  });

  //// JOB ROUTES

  // Post request that creates a new job entry in the database
  server.post("/api/job", (req, res) => {
    const newDate = req.body.deliveryDate.slice(0, 10);
    db.Job.create({
      client: req.body.client,
      address: req.body.address,
      contactName: req.body.contactName,
      contactNumber: req.body.contactNumber,
      backupContactName: req.body.backupContactName,
      backupContactNumber: req.body.backupContactNumber,
      details: req.body.details,
      worker_id: req.body.worker_id,
      deliveryDate: newDate,
      lat: req.body.lat,
      lng: req.body.lng
    })
      .then(() => {
        res.send("success");
      })
      .catch(error => console.log(error))
  });

   // Post request that creates a new job entry in the database
   server.put("/api/job", (req, res) => {
    const newDate = req.body.deliveryDate.slice(0, 10);
    db.Job.update({
      client: req.body.client,
      contactName: req.body.contactName,
      contactNumber: req.body.contactNumber,
      backupContactName: req.body.backupContactName,
      backupContactNumber: req.body.backupContactNumber,
      details: req.body.details,
      worker_id: req.body.worker_id,
      deliveryDate: newDate,
    }, {
      where: {
        id: req.body.id
      }
    })
      .then(() => {
        res.send("success");
      })
      .catch(error => console.log(error))
  });

  // Deletes a job from the database
  server.post("/api/deleteJob", (req, res) => {
    db.Job.destroy({
      where: {
        id: req.body.id
      }
    })
    .then(() => {
      res.send("deleted");
    })
    .then(result => res.json(result))
    .catch(error => console.log(error))
  });

  server.post("/api/deleteJobId", (req, res) => {
    console.log("TEST THIS", req.body)
    db.User.update({
      assignedJob: null
    }, {
      where: {
        id: req.body.id
      }
    })
      .then(result => res.json(result))
      .catch(error => console.log("DB Delete ERROR", error))
  });

  // put request that updates the assigned job collumn of a driver if they are selected for a new job
  server.put("/api/assignedJob", (req, res) => {
    db.User.update({
      assignedJob: req.body.jobCount
    }, {
      where: {
        id: req.body.worker_id
      }
    })
      .then(result => res.json(result))
      .catch(error => console.log("DB ERROR", error))
  });

  server.put("/api/newDriver", (req, res) => {
    db.User.update({
      assignedJob: req.body.job_id
    }, {
      where: {
        id: req.body.worker_id
      }
    })
      .then(result => res.json(result))
      .catch(error => console.log("DB ERROR", error))
  });

  // get request that gets all job information and sends back to the user
  server.get("/api/jobs", (req, res) => {
    db.Job.findAll({})
      .then(result => res.json(result))
      .catch(error => console.log(error))
  });

  // gets all information of completed jobs
  server.get("/api/completed", (req, res) => {
    db.Job.findAll({
      where: {
        completionDate: {
          [Op.not]: null
        }
      }
    })
    .then(result => res.json(result))
    .catch(error => console.log(error))
  });

  // Gets all information of active jobs
  server.get("/api/active", (req, res) => {
    db.Job.findAll({
      where: {
        inProgress: {
          [Op.eq]: true
        }
      }
    })
    .then(result => res.json(result))
    .catch(error => console.log(error))
  });

  // Gets all information of scheduled jobs 
  server.get("/api/scheduled", (req, res) => {
    db.Job.findAll({
      where: {
        [Op.and]: [{ inProgress: false }, { completionDate: null}]
      }
    })
    .then(result => res.json(result))
    .catch(error => console.log(error))
  });

  // Get the job information of a specific job ID
  server.post("/api/jobByID", (req, res) => {
    db.Job.findAll({
      where: {
        id: req.body.id
      }
    })
    .then(result => res.json(result))
    .catch(error => console.log(error))
  });

  server.put("/api/jobToInProgress", (req, res) => {
    db.Job.update({
      inProgress: true
    }, 
      {
        where: {
          id: req.body.jobId
        }
      })
      .then(result => res.json(result))
      .catch(error => console.log(error));
  })

  server.put("/api/jobToOutOfProgress", (req, res) => {
    db.Job.update({
      inProgress: false
    }, 
      {
        where: {
          id: req.body.jobId
        }
      })
      .then(result => res.json(result))
      .catch(error => console.log(error));
  })

};
