const fs = require('fs');
const cheerio = require('cheerio');

// Load the followers and following HTML files
const followersHtml = fs.readFileSync('followers_1.html', 'utf-8');
const followingHtml = fs.readFileSync('following.html', 'utf-8');

// Parse the HTML using Cheerio
const $followers = cheerio.load(followersHtml);
const $following = cheerio.load(followingHtml);

// Extract the list of followers and following
const followers = extractUsernames($followers);
const following = extractUsernames($following);

// Find users who are not following you back
const notFollowingBack = following.filter(user => !followers.includes(user));

console.log('Users not following you back:', notFollowingBack);

// Helper function to extract usernames from HTML
function extractUsernames($html) {
  const usernames = [];
  $html('a').each((i, el) => {
    const username = $html(el).text();
    usernames.push(username);
  });
  return usernames;
}