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
          const currentDate = new Date();
          const twentyFourHoursAgo = currentDate.getTime() - (24 * 60 * 60 * 1000);
          const timestampTwentyFourHoursAgo = Math.floor(twentyFourHoursAgo / 1000);

          console.log(timestampTwentyFourHoursAgo);
          const response = await fetch(`https://embedded.runalloy.com/2023-12/one/commerce/orders?connectionId=${connectionId}&createdTimestampMin=${timestampTwentyFourHoursAgo}`, {
            headers
          });
          const data = await response.json();
          res.status(200).json(data);
        } catch (error) {
          console.error('Error fetching orders:', error);
          res.status(500).json({ error: 'Error fetching orders' });
        }
        break;
  
      case 'POST':
        try {
          const response = await fetch(`https://embedded.runalloy.com/2023-12/one/commerce/orders?connectionId=${connectionId}`, {
            method: 'POST',
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
          });
          const data = await response.json();

          res.status(200).json(data);
        } catch (error) {
          console.error('Error creating order:', error);
          res.status(500).json({ error: 'Error creating orders' });
        }
        break;
  
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
