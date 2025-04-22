#!/bin/bash

echo "Building the Next.js application..."
npm run build

echo "Installing Netlify CLI if not already installed..."
if ! command -v netlify &> /dev/null
then
    npm install -g netlify-cli
fi

echo "Deploying to Netlify..."
netlify deploy --prod

echo "Deployment complete!" 