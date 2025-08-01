import Job from '../models/job.model.js';

const createJob = async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      location,
      preferredLocation,
      jobType,
      salaryRange,
      applicationDeadline,
      jobDescription
    } = req.body;

    // await Job.deleteMany({});

    // Field presence check
    if (!jobTitle || !companyName || !location || !preferredLocation || !jobType || !salaryRange || !applicationDeadline || !jobDescription) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if(salaryRange.min == null || salaryRange.max == null){
        return res.status(400).json({ success: false, message: 'Salary range is required' });
    }

    if(applicationDeadline == null){
        return res.status(400).json({ success: false, message: 'Application deadline is required' });
    }

    if(jobDescription == null){
        return res.status(400).json({ success: false, message: 'Job description is required' });
    }

    // Salary check
    if (salaryRange.min > salaryRange.max) {
      return res.status(400).json({ success: false, message: 'Minimum salary cannot be greater than maximum salary' });
    }

    // Deadline check
    if (new Date(applicationDeadline) < new Date()) {
      return res.status(400).json({ success: false, message: 'Application deadline cannot be in the past' });
    }

    const job = new Job({
      jobTitle,
      companyName,
      location,
      preferredLocation,
      jobType,
      salaryRange,
      applicationDeadline,
      jobDescription
    });

    await job.save();
    res.status(201).json({ success: true, message: 'Job created successfully', data: job });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating job', error: error.message });
  }
};

export default createJob;