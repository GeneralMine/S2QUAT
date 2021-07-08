echo "WARNING: Update Database using db push! This can cause data loss!"
read -p "Are you sure? " -n 1 -r
echo # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # do dangerous stuff

    echo "Updating Database..."
    sudo zip -r ../db.zip ../db
    git pull
    docker cp ../prisma/schema.prisma s2quat:/app/prisma/schema.prisma
    docker exec -it s2quat npx prisma db push
    echo "Finished updating database! Please restart the app now."

else
    echo "Abort."
fi
