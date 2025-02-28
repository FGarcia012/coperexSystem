import { Schema, model } from "mongoose"

const adminSchema = Schema({
    name: {
        type: String,
        required: [true, " Name is requiered"],
        maxLength: [25, " Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, " Surname is requiered"],
        maxLength: [25, " Surname cannot exceed 25 characters"]
    },
    username: {
        type: String,
        required: [true, " Username is requiered"],
        maxLength: [25, " Username cannot exceed 25 characters "],
        unique: true
    },
    email: {
        type: String,
        required: [true, " Email is requiered "],
        unique: true
    },
    password: {
        type: String,
        required: [true, " Password is requiered "],
        minLength: [8, " Password must be at least 8 characters "]
    },
    profilePicture: {
        type: String
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN"]
    },
    status: {
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timestamps: true
})

adminSchema.methods.toJSON = function () {
    const { __v, password, _id, ...administrador } = this.toObject()
    administrador.aid = administrador._id
    return administrador
}

export default model("Admin", adminSchema)