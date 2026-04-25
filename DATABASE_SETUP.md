# Database Setup & Test Data

## MongoDB Connection

### Local MongoDB
```bash
# Start MongoDB
mongod

# Or on Windows
# Make sure MongoDB service is running
```

### MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update MONGODB_URI in backend/.env

---

## Creating Test Data

### Method 1: Using MongoDB Compass (GUI)

1. **Download MongoDB Compass:** https://www.mongodb.com/products/compass
2. **Connect** to your MongoDB
3. **Create Database:** crm-db
4. **Create Collections:** users, leads, companies, tasks

#### Insert Test User
```javascript
db.users.insertOne({
  name: "Test User",
  email: "test@example.com",
  password: "$2b$10$...", // hashed password
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

### Method 2: Using MongoDB CLI

```bash
# Connect to MongoDB
mongosh

# Switch to database
use crm-db

# Create test user (password will be hashed during registration)
db.users.insertOne({
  name: "Test User",
  email: "test@example.com",
  password: "will_be_hashed",
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date()
})

# Create test company
db.companies.insertOne({
  name: "Tech Solutions Inc",
  industry: "Technology",
  location: "San Francisco, CA",
  description: "A leading technology solutions provider",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

### Method 3: API Registration

Simply use the registration endpoint:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

This will automatically hash the password and create the user.

---

## Database Schema Reference

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed with bcrypt),
  role: String, // "admin" or "user"
  createdAt: Date,
  updatedAt: Date
}
```

### Companies Collection
```javascript
{
  _id: ObjectId,
  name: String,
  industry: String,
  location: String,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Leads Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  status: String, // "New", "Contacted", "Lost"
  assignedTo: ObjectId, // Reference to User
  company: ObjectId, // Reference to Company
  isDeleted: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Tasks Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  lead: ObjectId, // Reference to Lead
  assignedTo: ObjectId, // Reference to User
  dueDate: Date,
  status: String, // "Pending" or "Completed"
  createdAt: Date,
  updatedAt: Date
}
```

---

## Indexes

The system automatically creates these indexes:

### Leads Collection
```javascript
// Text index for search
db.leads.createIndex({ name: "text", email: "text" })
```

---

## Sample Data Script

Run this in MongoDB to populate with test data:

```javascript
// Connect to crm-db
use crm-db

// Create test user
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "$2b$10$...", // Use hashed password
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})

// Get userId for reference
let userId = db.users.findOne({email: "admin@example.com"})._id

// Create test companies
db.companies.insertMany([
  {
    name: "Tech Innovation Ltd",
    industry: "Software Development",
    location: "New York, NY",
    description: "Leading software development company",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Digital Solutions Corp",
    industry: "Digital Marketing",
    location: "Los Angeles, CA",
    description: "Digital marketing and consulting",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Enterprise Systems Inc",
    industry: "Enterprise Software",
    location: "Chicago, IL",
    description: "Enterprise software solutions",
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

// Get company IDs
let companies = db.companies.find().toArray()

// Create test leads
db.leads.insertMany([
  {
    name: "John Martinez",
    email: "john@company1.com",
    phone: "+1-212-555-0100",
    status: "New",
    assignedTo: userId,
    company: companies[0]._id,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Sarah Johnson",
    email: "sarah@company2.com",
    phone: "+1-310-555-0200",
    status: "Contacted",
    assignedTo: userId,
    company: companies[1]._id,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Mike Wilson",
    email: "mike@company3.com",
    phone: "+1-312-555-0300",
    status: "Lost",
    assignedTo: userId,
    company: companies[2]._id,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

// Get leads for task references
let leads = db.leads.find().toArray()

// Create test tasks
db.tasks.insertMany([
  {
    title: "Follow-up call with John",
    description: "Discuss project requirements",
    lead: leads[0]._id,
    assignedTo: userId,
    dueDate: new Date(Date.now() + 2*24*60*60*1000), // 2 days from now
    status: "Pending",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Send proposal to Sarah",
    description: "Send detailed proposal document",
    lead: leads[1]._id,
    assignedTo: userId,
    dueDate: new Date(Date.now() + 1*24*60*60*1000), // 1 day from now
    status: "Pending",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Demo presentation",
    description: "Schedule demo for Mike's team",
    lead: leads[2]._id,
    assignedTo: userId,
    dueDate: new Date(Date.now() + 7*24*60*60*1000), // 7 days from now
    status: "Completed",
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

console.log("Test data created successfully!")
```

---

## Backup & Restore

### Backup Database
```bash
mongodump --db crm-db --out ./backup
```

### Restore Database
```bash
mongorestore --db crm-db ./backup/crm-db
```

---

## Troubleshooting

### Connection Issues
- Make sure MongoDB is running
- Check connection string format
- Verify MongoDB Atlas IP whitelist (if using cloud)

### Duplicate Key Error
- Clear collections: `db.collection.deleteMany({})`
- Or drop database: `db.dropDatabase()`

### Performance
- Add indexes as shown in schema
- Use projection to limit fields returned
- Implement pagination

---

## Production Considerations

1. **Always use connection pooling** for MongoDB
2. **Enable authentication** in production
3. **Use encrypted passwords** for all users
4. **Implement data validation** on insert
5. **Add backup strategy**
6. **Monitor database performance**
7. **Use read replicas** for scaling

---
