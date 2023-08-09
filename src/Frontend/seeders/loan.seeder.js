const { default: mongoose } = require("mongoose");
const loan_type = require("../Models/loan_types.model");
const connectDb = require("../DB/dc_con_discon");

async function saveLoan(name){
    await new loan_type.insertOne({loan_type:name})
}

async function main(){
    await connectDb.connectDb()

    await saveLoan("personal")
    await saveLoan("buisness")
    await saveLoan("car loan")
    await saveLoan("morgage")

    await connectDb.closeConnectionDB()
}

main()