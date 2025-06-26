const AWS = require('aws-sdk');
const PDFDocument = require('pdfkit');
const axios = require('axios');
const TestReport = require('../models/TestReport'); // Adjust path as needed

// Configure AWS S3 with your custom endpoint and credentials
const s3 = new AWS.S3({
  region: 'ap-southeast-2',
  endpoint: new AWS.Endpoint('https://mos.ap-southeast-2.sufybkt.com'),
  accessKeyId: 'iZtEMvxQJwxIv1Vu7cYhrcvXB4LeBTOxIX77Wq26',
  secretAccessKey: 'htZck8EbOPI3SZaN-Gf_XiziovUTzILtUZ3LXqVx',
  signatureVersion: 'v4',
  s3ForcePathStyle: true
});

const BUCKET_NAME = 'your-unique-bucket-name'; // Replace with your actual bucket name

// Utility functions
const motivationalSlogans = [
  "Keep pushing your limits!",
  "Every mistake is a step to success.",
  "Believe in yourself and all that you are.",
  "Success is the sum of small efforts repeated.",
  "Your potential is endless.",
  "Progress, not perfection, is the goal."
];

const generateReportName = () => {
  const prefixes = ["Hatched", "Bright", "Rising", "Soaring", "Flying", "Emerging"];
  const suffixes = ["Eagle", "Phoenix", "Falcon", "Hawk", "Owl", "Scholar"];
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]} Report`;
};

const getMotivationalSlogan = () => {
  return motivationalSlogans[Math.floor(Math.random() * motivationalSlogans.length)];
};

// Generate AI suggestions
const generateAISuggestions = async (report) => {
  const apiKey = 'AIzaSyAuwYTrhNjSGNwoXD5jfbZlLIsHsU9QlS8';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const scorePercentage = ((report.score / report.total) * 100).toFixed(1);
  const weakTopics = report.topicAccuracy
    .filter(topic => (topic.correct / topic.total) < 0.6)
    .map(topic => topic.name)
    .slice(0, 3);

  const promptText = `Based on this test performance:
    - Score: ${report.score}/${report.total} (${scorePercentage}%)
    - Time taken: ${report.timeTaken} seconds
    - Weak areas: ${weakTopics.join(', ') || 'None identified'}
    
    Generate 3-4 personalized study suggestions in bullet points. Keep it motivational and actionable.`;

  try {
    const response = await axios.post(url, {
      contents: [{ parts: [{ text: promptText }] }]
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating AI suggestions:', error);
    return "• Keep practicing consistently\n• Review your weak areas\n• Focus on time management\n• Seek help when needed";
  }
};

// Generate PDF document
const generatePDFReport = async (report, aiSuggestions, reportName, slogan) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks = [];

      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        resolve(pdfBuffer);
      });
      doc.on('error', reject);

      // PDF Header
      doc.fontSize(24).fillColor('#2C3E50').text(reportName, { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(14).fillColor('#7F8C8D').text(slogan, { align: 'center' });
      doc.moveDown(1);

      // Divider line
      doc.strokeColor('#BDC3C7').lineWidth(2)
         .moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(1);

      // Basic Information Section
      doc.fontSize(18).fillColor('#2C3E50').text('📊 Performance Overview', { underline: true });
      doc.moveDown(0.5);

      const scorePercentage = ((report.score / report.total) * 100).toFixed(1);
      const performanceLevel = scorePercentage >= 80 ? '🌟 Excellent' :
                             scorePercentage >= 60 ? '👍 Good' :
                             scorePercentage >= 40 ? '📈 Average' : '🔄 Needs Improvement';

      doc.fontSize(12).fillColor('#34495E');
      doc.text(`Score: ${report.score} / ${report.total} (${scorePercentage}%)`);
      doc.moveDown(0.3);
      doc.text(`Performance Level: ${performanceLevel}`);
      doc.moveDown(0.3);
      doc.text(`Time Taken: ${Math.floor(report.timeTaken / 60)} minutes ${report.timeTaken % 60} seconds`);
      doc.moveDown(0.3);
      doc.text(`Average Time per Question: ${report.avgTimePerQ} seconds`);
      doc.moveDown(0.3);
      doc.text(`Unattempted Questions: ${report.unattempted}`);
      doc.moveDown(1);

      // Topic Accuracy Section
      doc.fontSize(18).fillColor('#2C3E50').text('📚 Topic-wise Performance');
      doc.moveDown(0.5);

      if (report.topicAccuracy && report.topicAccuracy.length > 0) {
        report.topicAccuracy.forEach(topic => {
          const accuracy = ((topic.correct / topic.total) * 100).toFixed(1);
          const emoji = accuracy >= 80 ? '🟢' : accuracy >= 60 ? '🟡' : '🔴';
          doc.fontSize(12).fillColor('#34495E')
             .text(`${emoji} ${topic.name}: ${topic.correct}/${topic.total} (${accuracy}%)`);
          doc.moveDown(0.2);
        });
      }
      doc.moveDown(1);

      // AI Suggestions Section
      doc.fontSize(18).fillColor('#2C3E50').text('🤖 Personalized Study Suggestions');
      doc.moveDown(0.5);
      doc.fontSize(12).fillColor('#34495E').text(aiSuggestions);
      doc.moveDown(1);

      // Questions Analysis
      if (report.questions && report.questions.length > 0) {
        doc.addPage();
        doc.fontSize(18).fillColor('#2C3E50').text('❓ Questions Analysis');
        doc.moveDown(0.5);

        report.questions.slice(0, 10).forEach((question, index) => {
          const status = question.isCorrect ? '✅' : '❌';
          doc.fontSize(12).fillColor('#34495E');
          doc.text(`${status} Q${index + 1}: ${question.questionText.substring(0, 100)}...`);
          doc.moveDown(0.2);
          doc.fontSize(10).fillColor('#7F8C8D');
          doc.text(`Your Answer: Option ${question.userAnswer} | Correct: Option ${question.correctOption}`);
          if (question.topics && question.topics.length > 0) {
            doc.text(`Topics: ${question.topics.join(', ')}`);
          }
          doc.moveDown(0.5);
        });
      }

      // Footer
      doc.fontSize(10).fillColor('#95A5A6')
         .text(`Generated on: ${new Date().toLocaleString()}`, 50, doc.page.height - 50);
      doc.text('Powered by Hatched Learning Platform', 400, doc.page.height - 50);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

// Upload PDF to S3
const uploadToS3 = async (pdfBuffer, fileName) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: `test-reports/${fileName}`,
    Body: pdfBuffer,
    ContentType: 'application/pdf',
    ContentDisposition: 'inline',
    ACL: 'public-read'
  };

  try {
    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    console.error('S3 Upload Error:', error);
    throw new Error(`S3 Upload failed: ${error.message}`);
  }
};

// Test S3 connection
const testS3Connection = async () => {
  try {
    const params = { Bucket: BUCKET_NAME };
    await s3.headBucket(params).promise();
    console.log('✅ S3 connection successful');
    return true;
  } catch (error) {
    console.error('❌ S3 connection failed:', error.message);
    return false;
  }
};

// Main function to generate and upload PDF report
const generateAndUploadReport = async (userId, reportId) => {
  try {
    // Test S3 connection first
    const s3Connected = await testS3Connection();
    if (!s3Connected) {
      throw new Error('S3 service unavailable - Cannot connect to S3 bucket');
    }

    // Fetch test report from database
    const report = await TestReport.findOne({
      _id: reportId,
      userId: userId
    }).populate('userId').lean();

    if (!report) {
      throw new Error('Test report not found');
    }

    // Check if PDF already exists
    if (report.pdfUrl) {
      return {
        success: true,
        message: 'PDF already exists',
        pdfUrl: report.pdfUrl,
        reportName: report.reportName || generateReportName()
      };
    }

    // Generate motivational content
    const reportName = generateReportName();
    const slogan = getMotivationalSlogan();

    // Generate AI suggestions
    console.log('Generating AI suggestions...');
    const aiSuggestions = await generateAISuggestions(report);

    // Generate PDF
    console.log('Generating PDF...');
    const pdfBuffer = await generatePDFReport(report, aiSuggestions, reportName, slogan);

    // Upload to S3
    console.log('Uploading to S3...');
    const fileName = `${userId}_${reportId}_${Date.now()}.pdf`;
    const s3Url = await uploadToS3(pdfBuffer, fileName);

    // Update report with PDF URL
    await TestReport.findByIdAndUpdate(reportId, {
      pdfUrl: s3Url,
      reportName: reportName,
      motivationalSlogan: slogan
    });

    console.log('✅ PDF report generated successfully:', s3Url);

    return {
      success: true,
      message: 'PDF report generated successfully',
      pdfUrl: s3Url,
      reportName: reportName,
      motivationalSlogan: slogan
    };

  } catch (error) {
    console.error('Error generating PDF report:', error);
    throw error;
  }
};

// Get existing PDF URL
const getExistingPdfUrl = async (userId, reportId) => {
  try {
    const report = await TestReport.findOne({
      _id: reportId,
      userId: userId
    }, 'pdfUrl reportName motivationalSlogan').lean();

    if (!report) {
      throw new Error('Test report not found');
    }

    if (!report.pdfUrl) {
      throw new Error('PDF not generated yet');
    }

    return {
      success: true,
      pdfUrl: report.pdfUrl,
      reportName: report.reportName,
      motivationalSlogan: report.motivationalSlogan
    };

  } catch (error) {
    throw error;
  }
};

// Export all functions
module.exports = {
  generateReportName,
  getMotivationalSlogan,
  generateAISuggestions,
  generatePDFReport,
  uploadToS3,
  testS3Connection,
  generateAndUploadReport,
  getExistingPdfUrl,
  s3,
  BUCKET_NAME
};
