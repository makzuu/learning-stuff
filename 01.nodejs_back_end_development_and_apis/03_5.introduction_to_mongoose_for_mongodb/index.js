require('./src/database')

let EmailModel = require('./src/models/email')
let UserModel = require('./src/models/user')

const createEmail = msg => {
    msg.save()
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error(err)
        })
}

const findEmail = email => {
    EmailModel.find({email})
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error(err)
        })
}

const findAndUpdate = (email, newEmail, options) => {
    EmailModel.findOneAndUpdate({email}, newEmail, options)
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error(err)
        })
}

const findAndRemove = email => {
    EmailModel.findOneAndRemove({email})
        .then(response => console.log(response))
        .catch(err => console.error(err))
}

let msg = new EmailModel({
  email: 'ADA.LOVELACE@GMAIL.COM'
})

// -- crud
// createEmail(msg)
// findEmail(msg.email)
// findAndUpdate(msg.email, {email: 'theoutlander@live.com'}, {new: true, runValidators: true})
// findAndRemove('theoutlander@live.com')

const fullName = name => {
    let user = new UserModel()
    user.fullName = name
    console.log(user.toJSON())
    console.log()
    console.log(user.fullName)
}

// -- virtual property
// fullName('Thomas Anderson')

const getInitials = () => {
    const user = new UserModel({
        firstName: 'makz',
        lastName: 'mann'
    })

    const initials = user.getInitials()
    console.log(initials)
}

// -- instance methods
// getInitials()

const getUsers = () => {
    UserModel.getUsers()
    .then(users => console.log(users))
    .catch(err => console.error(err))
}
// -- static methods
// getUsers()

const saveUser = () => {
    const user = new UserModel({
        fullName: 'Thomas Anderson'
    })

    user.save()
        .then(doc => {
            console.log(doc)
        })
        .catch(err => console.error(err))
}
// -- middleware
// saveUser()

const newEmail = email => {
    email.save()
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error(err)
        })
}
// -- plugins
// const email = EmailModel({email: 'makz.mann@gmail.com'})
// newEmail(email)

const query = () => {
    UserModel.find()              // find all users
        .skip(100)                // skip the first 100 items
        .limit(10)                // limit to 10 items
        .sort({firstName: 1})      // sort ascending by firstName
        .select({firstName: true}) // select firstName only
        .exec()                   // execute the query
        .then(docs => {
            console.log(docs)
        })
        .catch(err => {
            console.error(err)
        })
}
// -- query building
// query()
