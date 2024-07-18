# Bitcoin Price Microservice

## Overview

This microservice provides real-time Bitcoin price information from the Binance exchange. It fetches the current Bitcoin price, applies a configurable service commission, and serves the data via an HTTP API. The price is updated at regular intervals, which can be configured.

## Features

- Fetches real-time Bitcoin price from Binance
- Applies a configurable service commission
- Updates price at configurable intervals
- Provides a simple HTTP API to retrieve the current price
- Dockerized for easy deployment and scaling

## Prerequisites

- Node.js (latest)
- Docker and Docker Compose (for containerized deployment)
- npm (Comes with Node.js)

## Configuration

The application uses environment variables for configuration. You can set these in the `.env` file in the root directory.

- `PORT`: The port on which the server will run (default: 3000)
- `UPDATE_FREQUENCY`: The interval (in milliseconds) at which the Bitcoin price is updated (default: 10000)
- `SERVICE_COMMISSION`: The service commission applied to the Bitcoin price (default: 0.0001, which is 0.01%)

Example `.env` file:

```
PORT=3000
UPDATE_FREQUENCY=10000
SERVICE_COMMISSION=0.0001
```

## Installation & Execution

1. Clone the repository:
```
git clone https://github.com/yourusername/btc_price.git
cd btc_price
```

2. Run Docker container:
MacOS
```
docker compose up --build
```
Windows
```
docker-compose up --build
```

## API Endpoints

- `GET /`: Dashboard with real-time price updates.
- `GET /btc/usdt`: Returns the current Bitcoin price in JSON format.

Example response from `/btc/usdt`:
```json
{
    "bid":"64006.69",
    "ask":"64019.50",
    "midPrice":"64013.10"
}
```

## Testing

Testing should be done on the CI/CD pipeline, for example, when running a GitHub workflow in GitHub Actions, so it is excluded from the main scripts. Install `jest` locally as a devDependency with `npm i --save-dev jest` and run the tests with:

```
npm test
```
