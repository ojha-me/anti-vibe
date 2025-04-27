.PHONY: app-up app-build app-down app-migrate app-generate app-migrate-deploy app-reset

app-up:
	docker-compose up -d

app-build:
	docker-compose build

app-down:
	docker-compose down

app-generate:
	docker-compose exec app npx prisma generate --schema=src/prisma/schema.prisma

app-migrate:
	docker-compose exec app npx prisma migrate dev --name $(name) --schema=src/prisma/schema.prisma

app-migrate-deploy:
	docker-compose exec app npx prisma migrate deploy --schema=src/prisma/schema.prisma

app-reset:
	docker-compose exec app npx prisma migrate reset --schema=src/prisma/schema.prisma

# i had to do this because when I install a package locally, it wont be in the docker container
# and I would have to rebuild the container every time which is annoying
# so this is a workaround to install the package in the container
# and since I have a volume bind mount, . /app so it will reflect in the local directory
app-install:
	docker-compose exec app npm install ${pkg} --legacy-peer-deps
