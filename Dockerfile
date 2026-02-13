# Use a stable LTS version (Node 19 is End-of-Life; 20 or 22 is better)
FROM node:20-alpine

# Set the working directory once at the top
WORKDIR /usr/app

# 1. Copy package files first to leverage Docker cache
COPY package*.json ./

# 2. Install dependencies
RUN npm install

# 3. Copy the rest of the application code (including your config and src)
COPY . .

# 4. Expose the port your "Health" script uses
EXPOSE 5000

# 5. Start the application
# Note: Ensure your "Health" script in package.json is: "vite --port 5000 --host"
CMD ["npm", "run", "Health"]
