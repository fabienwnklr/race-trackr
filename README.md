# Race TrackR

## Setup local

1. Create `race-trackr` database
2. Run `node ace migration:run`
3. Run `node ace db:seed`

## Run

Project use [ioredis (redis)](https://github.com/redis/ioredis)

first run redis on ubuntu for windows

```bash
sudo service redis-server start
```

then run project

```bash
yarn dev
```
