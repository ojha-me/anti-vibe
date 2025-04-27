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
