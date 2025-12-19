// Vercel serverless function entry point
// Import and re-export as a handler function
import('../server.js').then(module => {
  global.handler = module.default;
}).catch(err => console.error('Failed to load server:', err));

export default (req, res) => {
  if (!global.handler) {
    return res.status(503).send('Server initializing...');
  }
  return global.handler(req, res);
};
