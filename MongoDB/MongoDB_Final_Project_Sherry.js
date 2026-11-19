//PART A
//Task 1
db.customers.countDocuments({})

// Task 2
db.customers.find(
    { city: "Haifa" },
    { _id: 0, name: 1, city: 1 }
)

// Task 3
db.orders.find(
    { status: "paid", total: { $gt: 100 } },
    { _id: 0, customer: 1, total: 1 }
)

// Task 4
db.orders.countDocuments({
    "shipping.city": { $in: ["Haifa", "Tel Aviv"] }
})

// Task 5a
db.customers.find(
    { hobbies: "chess" },
    { _id: 0, name: 1 }
)
// Task 5b
db.customers.find(
    { hobbies: { $all: ["chess", "running"] } },
    { _id: 0, name: 1 }
)

// Task 6
db.products.find(
    { price: { $gte: 10, $lte: 30 } },
    { _id: 0, name: 1, price: 1 }
).sort({ price: 1 })

// Task 7
db.orders.countDocuments({
    createdAt: {
        $gte: new Date("2026-06-01"),
        $lt: new Date("2026-06-08")
    }
})

// Task 8a
db.customers.find(
    { email: { $exists: false } },
    { _id: 0, name: 1 }
)
// Task 8b
db.customers.find(
    { email: null },
    { _id: 0, name: 1 }
)

// Task 9
db.customers.find(
    { city: { $nin: ["Haifa", "Eilat"] } },
    { _id: 0, name: 1 }
)

// Task 10
db.customers.find(
    { name: /^[DN]/ },
    { _id: 0, name: 1 }
)

// Task 11
db.orders.find(
    {},
    { _id: 0, customer: 1, total: 1 }
).sort({ total: -1 }).limit(2)


//PART B
//Task 12a
db.customers.updateOne(
    { name: "Noa" },
    { $push: { hobbies: "reading" } }
)
// Task 12b
db.customers.updateOne(
    { name: "Noa" },
    { $pull: { hobbies: "chess" } }
)
// Task 12c
db.customers.find(
    { name: "Noa" },
    { _id: 0, hobbies: 1 }
)

// Task 13
db.products.updateOne(
    { name: "Mug" },
    { $addToSet: { tags: "gift" } }
)

db.products.updateOne(
    { name: "Mug" },
    { $addToSet: { tags: "gift" } }
)

db.products.find(
    { tags: { $size: 2 } },
    { _id: 0, name: 1, tags: 1 }
)

// Task 14
db.customers.updateOne(
    { name: "Dana" },
    { $set: { city: "Eilat" } }
)

// Task 14
db.customers.countDocuments(
    { city: "Eilat" }
)

// Task 15
db.pageViews.updateOne(
    { page: "home" },
    { $inc: { views: 1 } },
    { upsert: true }
)

db.pageViews.updateOne(
    { page: "home" },
    { $inc: { views: 1 } },
    { upsert: true }
)

db.pageViews.updateOne(
    { page: "home" },
    { $inc: { views: 1 } },
    { upsert: true }
)

db.pageViews.findOne(
    { page: "home" },
    { _id: 0, page: 1, views: 1 }
)


//PART C
// Task 16
db.orders.aggregate([
    {
        $match: { status: "paid" }
    },
    {
        $group: {
            _id: "$customer",
            totalPaid: { $sum: "$total" }
        }
    },
    {
        $sort: { totalPaid: -1 }
    }
])

// Task 17
db.orders.aggregate([
    {
        $group: {
            _id: "$status",
            averageTotal: { $avg: "$total" }
        }
    }
])

// Task 18
db.orders.aggregate([
    {
        $group: {
            _id: "$shipping.city",
            totalOrders: { $sum: 1 }
        }
    }
])


// PART D
// Task 19
db.orders.deleteMany(
    { status: "cancelled" }
)

db.orders.countDocuments({})

// Task 20
db.orders.createIndex({ customer: 1 })

db.orders.getIndexes()

// Task 21
db.customers.distinct("city")


// PART E
// Task 22
/*{ email: null } מחזיר מסמכים שבהם השדה email מכיל ערך null או שהשדה כלל אינו קיים. 
כלומר היא בודקת בודקת גם שדות שערכם null וגם שדות חסרים.
במשימה 8 התקבלו 2 לקוחות, Omer ו-Lior.

השאילתה { email: { $exists: false } } מחזירה רק מסמכים שבהם השדה email אינו קיים כלל.
כלומר היא בודקת בודקת רק אם השדה אינו קיים במסמך.
במשימה 8 התקבל רק Lior.
*/

// Task 23
/*
א. שיטת Embedding
כי כתובות המשלוח קשורות ישירות ללקוח ומהוות חלק מהמידע שלו. 
וכך שמירת הכתובות בתוך מסמך הלקוח תאפשר גישה נוחה ומהירה לנתונים.

ב. כל ההזמנות של לקוח שמבצע הרבה רכישות לאורך השנה - Referencing.
כי שלקוח מבצע רכישות רבות זה עשוי לצבור מספר גדול של הזמנות לאורך זמן.
שמירת הזמנות במסמכים נפרדים וקישור ללקרוח בעזרת מזהה מאפשרת לנהל נתונים באופן יעיל.
*/