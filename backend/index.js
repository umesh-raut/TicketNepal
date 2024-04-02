const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const dbconfig = require('./db')
const bodyParser = require('body-parser');
const { default: axios } = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 3000

//khalti api  server side intergration
app.post('/khaltiApi', async (req, res) => {
  const payload = req.body;
  const khaltiResponse = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', payload,
    {
      headers: {
        authorization: `Key ${process.env.KHALTI_API_KEY}`,
      },
    });
  if (khaltiResponse) {
    res.json({
      success: true,
      data: khaltiResponse.data
    })
  } else {
    res.json({
      success: false,
      message: 'something went wrong while processing payment'
    })
  }
})
// user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});
//passanger detail with ticket schema
const TicketSchema = new mongoose.Schema({
  passengerName: {
    type: String,
    required: true
  },
  passengerAge: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true

  },
  ticketType: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  summary: {
    type: Object,
    required: true
  },
  ddate: {
    type: Date,
    required: true
  },
  airports: {
    type: Array,
    required: true
  },
  transactionId: {
    type: String,
    required: false
  }
}, {
  timeStamps: true,
});

const User = mongoose.model('User', userSchema);
//getting registration from frontend and storing in database
app.post('/register', async (req, res) => {
  const { email, number, password, fullName } = req.body;

  const user = new User({ email, number, password, fullName });

  try {
    await user.save();
    res.status(200).send("User registered successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});
//login 
app.post('/login', async (req, res) => {
  let { email, password } = req.body;

  try {
    // Search the database for a user with the provided email
    let user = await User.findOne({ email });

    // If the user is not found, or the password is incorrect, return an error
    if (!user || user.password !== password) {
      return res.status(400).send('Email or password is incorrect');
    }


    // If everything checks out, send a successful response
    res.status(200).send(user);


  } catch (error) {
    return res.status(400).json({ error })

  }
});
//storing ticket details with passenger info


const Ticket = mongoose.model('Ticket', TicketSchema);

app.post('/myBookings', async (request, response) => {

  try {
    if (!request.body.userId) {
      return response.status(400).send("Error: userID not provided");
    }
    const ticket = new Ticket({
      ...request.body,
      userID: request.body.userId
    });
    ticket.userId = request.body.userId
    await ticket.save();
    response.send("Ticket saved successfully");
  } catch (error) {
    console.error(error);
    response.status(500).send("Error saving ticket data");
  }
});
//displaying ticket data based on current user
app.get('/getUserTicket/:userId', async (req, res) => {
  try {
    const ticketData = await Ticket.find({ userId: req.params.userId });
    res.send(ticketData);
  } catch (err) {
    console.log(err);
  }
});
//deleting a ticket permanently from db
app.delete('/deleteTicket/:ticketId', async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndRemove(req.params.ticketId);
    res.send(deletedTicket);

  } catch (error) {
    console.log(error);

  }
})
//displaying all users in dashboard
app.get('/getUser', async (req, res) => {
  try {
    const userData = await User.find();
    res.send(userData);
  } catch (err) {
    console.log(err);
  }
});
//delete user from dashboard
app.delete('/getUser/:userId', async (req, res) => {
  try {
    const deletedUser = await Ticket.findByIdAndRemove(req.params.userId);
    res.send(deletedUser);

  } catch (error) {
    console.log(error);

  }
})
//display all booked tickets in dashboard
app.get('/getTickets', async (req, res) => {
  try {
    const allTickets = await Ticket.find();
    res.send(allTickets);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
