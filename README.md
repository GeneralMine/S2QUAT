# S2QUAT
![Test](https://github.com/GeneralMine/S2QUAT/workflows/Test/badge.svg)
S2QUAT an Integrative Quality Framework for Developing Industrial Smart Services 

## Database
To startup the database use: `docker run --name mariadb -e MYSQL_ROOT_PASSWORD=password -d -v ./db:/var/lib/mysql -p 3306:3306 mariadb:latest`

### How to update schema on production server?
Dont recreate the last image! Abort the github action and pull locally!
> Take care of data loss! So make a backup in advance: `zip -r db.zip db`
Then copy the new schema file into the container: `docker cp schema.prisma s2quat:/app/prisma/schema.prisma`
And push the changes `docker exec -it s2quat npx prisma db push`

## Danke
Danke an den Svelte Magier Julius Weber!