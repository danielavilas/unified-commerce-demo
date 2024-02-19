export default async function handler(req, res) {
    const YOUR_API_KEY = process.env.ALLOY_API_KEY;
    const connectionId = req.query.connectionId;
  
    if (!connectionId) {
      return res.status(400).json({ error: 'ConnectionId is required' });
    }
  
    const headers = {
      'Authorization': `bearer ${YOUR_API_KEY}`,
      'Accept': 'application/json'
    };
  
    switch (req.method) {
      case 'GET':
        try {
          const response = await fetch(`https://embedded.runalloy.com/2023-12/one/commerce/products?connectionId=${connectionId}`, { headers });
          const data = await response.json();
          res.status(200).json(data);
        } catch (error) {
          console.error('Error fetching products:', error);
          res.status(500).json({ error: 'Error fetching products' });
        }
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
