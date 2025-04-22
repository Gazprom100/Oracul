# Oracul Dashboard

A cryptocurrency analytics dashboard inspired by Oracul, featuring interactive charts, data tables, and real-time market analytics.

## Features

- Dashboard with market overview and key metrics
- Detailed coin listings with search and filtering
- Individual coin detail pages with price charts
- Live market data updates
- DEL price analytics
- Native coin analytics
- Coin ratings system

## Tech Stack

- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS for styling
- Recharts for data visualization
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js 16.8+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/oracul.git
cd oracul
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Integration

The application is designed to work with the following API endpoints:

- `/api/v1/coins/coins` - List of coins with pagination
- `/api/v1/coins/delprice` - DEL price information
- `/api/v1/coins/live` - Live market data
- `/api/v1/coins/native` - Native coin information
- `/api/v1/coins/ratings` - Coin ratings with pagination
- `/api/v1/coins/{symbol}` - Individual coin information

You can configure the API base URL in the `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://your-api-url/api/v1/coins
```

## Deployment on Netlify

### Automatic Deployment

1. Create a new site on Netlify
2. Connect to your GitHub repository
3. Use the following build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add the required environment variables:
   - `NEXT_PUBLIC_API_URL` = `/.netlify/functions/api`

### Manual Deployment

1. Build the project:

```bash
npm run build
```

2. Deploy to Netlify using the CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Serverless Functions

The project includes Netlify serverless functions to handle API requests. These functions are located in the `netlify/functions` directory and automatically deployed when you deploy to Netlify.

## Content Management

This project includes Netlify CMS for content management. After deployment, you can access the CMS at:

```
https://your-site-url/admin
```

To enable Netlify Identity for user authentication:

1. Go to your Netlify site dashboard
2. Navigate to Settings > Identity
3. Click "Enable Identity"
4. Under Registration, select "Invite only"
5. Invite yourself and team members

## Screenshots

(Add screenshots here once deployed)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Inspired by [Oracul](https://app.oracul.io)
- Data provided by the Decimal Team API 