FROM node:24-bookworm

# Set the working directory inside the container
WORKDIR /e2e

# Set CI environment variable for proper reporting
ENV CI=true

# Copy package files first for better layer caching
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile || yarn install

# Install Playwright browsers using the installed Playwright version
RUN yarn playwright install --with-deps chromium

# Copy source files
COPY src ./src
COPY playwright.config.ts ./

# Run Playwright tests
CMD ["yarn", "start"]


