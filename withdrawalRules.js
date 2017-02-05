module.exports = [
    {
        match: "PAYPAL",
        to: "expenses:housing",
        memo: "Rent Paid"
    },
    {
        match: "PCC",
        to: "expenses:grocery",
        memo: "Groceries"
    },
    {
        match: "KEN",
        to: "expenses:grocery",
        memo: "Groceries"
    },
    {
        match: "FRED",
        to: "expenses:grocery",
        memo: "Groceries"
    },
    {
        match: "TILTH",
        to: "expenses:grocery",
        memo: "CSA"
    },
    {
        match: "CITY LIGHT",
        to: "expenses:utilities",
        memo: "Electric Bill"
    },
    {
        match: "LANDS END",
        to: "expenses:household"
    },
    {
        match: "BOLDTYPETICKETS",
        to: "expenses:entertainment:events"
    },
    {
        match: "AMAZON",
        to: "expenses:household"
    },
    {
        match: "BROADCAST",
        to: "expenses:entertainment:dining:coffee"
    },
    {
        match: (object) => object.memo.indexOf("BgLLARD COFFEE") > -1 && object.amount > 10,
        to: "expenses:grocery:coffee",
        memo: "Coffee Beans"
    },
    {
        match: (object) => object.memo.indexOf("HERKIMER") > -1 && object.amount > 10,
        to: "expenses:grocery:coffee",
        memo: "Coffee Beans"
    },
    {
        match: "684-PARK",
        to: "expenses:transportation:parking",
        memo: "Parking"
    }
]

