import Job from '../models/job.model.js';

function getTimePosted(createdAt) {
  const diff = Date.now() - new Date(createdAt).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days < 1) return 'Today';
  if (days < 7) return `${days}d Ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w Ago`;
}

const getFormattedJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    const formattedJobs = jobs.map(job => ({
      companyLogo: job.companyName?.[0]?.toUpperCase() || '',
      companyName: job.companyName,
      jobTitle: job.jobTitle,
      timePosted: getTimePosted(job.createdAt),
      experience: '3-5 yr Exp', // Dummy Data
      location: job.preferredLocation || job.location || 'N/A',
      salary: `${Math.floor((job.salaryRange.max * 12) / 100000)} LPA`,
      minSalary: job.salaryRange.min,
      maxSalary: job.salaryRange.max,
      jobType: job.jobType,
      description: job.jobDescription
        .split('.')
        .map(line => line.trim())
        .filter(line => line.length > 0)
    }));

    res.json({ success: true, data: formattedJobs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch jobs', error: err.message });
  }
};

export default getFormattedJobs;