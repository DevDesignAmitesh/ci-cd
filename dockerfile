# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1
WORKDIR /usr/src/app

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# install with --production (exclude devDependencies)
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# then copy all (non-ignored) project files into the image
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
RUN bun test

# run the app
USER bun
EXPOSE 3000/tcp
CMD [ "./entry.sh" ]