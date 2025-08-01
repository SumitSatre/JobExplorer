import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    preferredLocation: { type: String },
    jobType: { type: String, enum: ['Internship', 'Full Time', 'Parttime', 'Contract'], default: 'Full Time' },
    salaryRange: { 
        min: { type: Number, required: true },
        max: { type: Number, required: true },
    },
    applicationDeadline: { type: Date },
    jobDescription: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Jobs', jobSchema);      
