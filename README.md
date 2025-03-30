# Race TrackR

## Setup local

1. Create `race-trackr` database
2. Run `node ace migration:run`
3. Run `node ace db:seed`

## Run

Project use [iosredis (redis)](https://github.com/redis/ioredis)

first run redis on ubuntu for windows

```bash
sudo service redis-server start
```
enter password setup for ubuntu unix

then run project

```bash
yarn dev
```
