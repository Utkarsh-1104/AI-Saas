import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
    },
    jdText: {
        type: String,
        required: true,
        trim: true
    }, 
    resumeText: {
        type: String,
        required: true,
        trim: true
    }, 
    analysis: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});

const Analysis = mongoose.models.Analysis || mongoose.model("Analysis", analysisSchema);
export default Analysis;
