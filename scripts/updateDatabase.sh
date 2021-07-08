#!/bin/bash

echo "WARNING: Update Database using db push! This can cause data loss!"

echo -n "Do you want to run $*? [N/y] "
read REPLY
echo

if test "$REPLY" = "y" -o "$REPLY" = "Y"; then

    echo "Updating Database..."
    sudo zip -r ../db.zip ../db
    git pull
    docker cp ../prisma/schema.prisma s2quat:/app/prisma/schema.prisma
    docker exec -it s2quat npx prisma db push
    echo "Finished updating database! Please restart the app now."

else

    echo "Abort."

fi
