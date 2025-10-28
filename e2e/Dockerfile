# Stage 1: Install Playwright browsers and dependencies
FROM node:22-bookworm AS playwright-setup

# Install only Chromium and system dependencies
RUN npx playwright install --with-deps chromium

# Stage 2: Build and run tests
FROM playwright-setup AS test-runner

# Set the working directory inside the container
WORKDIR /e2e

# Set CI environment variable for proper reporting
ENV CI=true

# Copy package files first for better layer caching
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile || yarn install

# Copy source files
COPY src ./src
COPY playwright.config.ts ./

# Run Playwright tests
CMD ["yarn", "start"]


