import { Schema, model } from "mongoose"

const CompanySchema = Schema ({
    name: {
        type: String,
        required: [true, "Company name is required"],
        unique: true
    },
    manager: {
        type: String,
        required: [true, "Manager is required"]
    },
    impactLevel: {
        type: String,
        required: [true, "Impact level is required"]
    },
    yearsOfExperience: {
        type: String,
        required: [true, "Years of experience is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    }
},
{
    versionKey: false,
    timestamps: true
})

CompanySchema.methods.toJSON = function () {
    const { __v, _id, ...empresa } = this.toObject ()
    empresa.eid = empresa._id
    return empresa;
}

export default model("Empresa", CompanySchema)