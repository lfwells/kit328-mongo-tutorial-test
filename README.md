# Starting point for a deployable MongoDB tutorial
I could have done a version of this without deployment stuff in it, but the Assig 1 base code will need this
Note, things getting messier and messier about base-paths due to not using subdomains

## Running the project
Within the terminal on the codespace run
```sh
docker compose -f docker-compose.yaml -f docker-compose.override.yaml up -d
```
And visit the forwarded port 3002

## Populating the database
Here you can populate the db with some seed data:
```sh
docker exec -i db-student-app mongosh "mongodb://root:student_secure_pass@localhost:27017/student_db?authSource=admin" --eval "db.tasks.insertMany([{title: 'Complete KIT328 Tutorial', completed: false}, {title: 'Fix Docker Networking Hooks', completed: true}])"
```

## Debugging
You can check the logs of the services using the following
```sh
docker logs frontend-student-app
docker logs backend-student-app
```