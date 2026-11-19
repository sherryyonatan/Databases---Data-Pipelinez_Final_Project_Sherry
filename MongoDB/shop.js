// use shop
db.dropDatabase()
db = db.getSiblingDB("shop");

db.customers.insertMany([
    { name: "Dana", city: "Haifa", email: "dana@example.com", hobbies: ["chess", "running"], joinedAt: new Date("2026-01-05") },
    { name: "Yossi", city: "Tel Aviv", email: "yossi@example.com", hobbies: ["music"], joinedAt: new Date("2026-02-10") },
    { name: "Noa", city: "Haifa", email: "noa@example.com", hobbies: ["chess"], joinedAt: new Date("2026-03-20") },
    { name: "Omer", city: "Eilat", email: null, hobbies: [], joinedAt: new Date("2026-04-02") },
    { name: "Lior", city: "Tel Aviv", hobbies: ["running", "music"], joinedAt: new Date("2026-05-15") }
])

db.orders.insertMany([
    { customer: "Dana", total: 120, status: "paid", createdAt: new Date("2026-06-01"), shipping: { city: "Haifa", street: "Herzl 5" } },
    { customer: "Dana", total: 80, status: "cancelled", createdAt: new Date("2026-06-03"), shipping: { city: "Haifa", street: "Herzl 5" } },
    { customer: "Yossi", total: 250, status: "paid", createdAt: new Date("2026-06-05"), shipping: { city: "Tel Aviv", street: "Dizengoff 10" } },
    { customer: "Noa", total: 40, status: "pending", createdAt: new Date("2026-06-07"), shipping: { city: "Haifa", street: "Herzl 5" } },
    { customer: "Noa", total: 300, status: "paid", createdAt: new Date("2026-06-09"), shipping: { city: "Haifa", street: "Herzl 5" } },
    { customer: "Lior", total: 60, status: "pending", createdAt: new Date("2026-06-10"), shipping: { city: "Tel Aviv", street: "Ibn Gabirol 20" } },
    { customer: "Lior", total: 500, status: "paid", createdAt: new Date("2026-06-12"), shipping: { city: "Tel Aviv", street: "Ibn Gabirol 20" } },
    { customer: "Omer", total: 90, status: "cancelled", createdAt: new Date("2026-06-14"), shipping: { city: "Eilat", street: "Hatmarim 3" } }
])

db.products.insertMany([
    { name: "Mug", price: 30, tags: ["kitchen"] },
    { name: "Notebook", price: 12, tags: ["office"] },
    { name: "Headphones", price: 150, tags: ["music", "electronics"] }
])