const fs = require('fs');
const fetch = require('node-fetch');

// API endpoint
const API_URL = 'http://localhost:3000/api/blogs';

// Read blog data from JSON file
const blogData = JSON.parse(fs.readFileSync('./scripts/blog-data.json', 'utf8'));

// Function to post a single blog
async function postBlog(blog) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log(`Blog "${blog.title}" posted successfully!`);
      return true;
    } else {
      console.error(`Failed to post blog "${blog.title}": ${data.message}`);
      return false;
    }
  } catch (error) {
    console.error(`Error posting blog "${blog.title}":`, error.message);
    return false;
  }
}

// Function to post all blogs sequentially
async function postAllBlogs() {
  console.log(`Starting to post ${blogData.length} blogs...`);
  
  let successCount = 0;
  
  for (const blog of blogData) {
    const success = await postBlog(blog);
    if (success) successCount++;
    
    // Add a small delay between requests to avoid overloading the server
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`Finished posting blogs. ${successCount} of ${blogData.length} blogs posted successfully.`);
}

// Execute the script
postAllBlogs().catch(error => {
  console.error('Script execution failed:', error);
}); 