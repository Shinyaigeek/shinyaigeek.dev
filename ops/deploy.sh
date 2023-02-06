source ./.env

mkdir ./tmp
mkdir ./tmp/.ssh

echo "$VPS_SECRET_KEY" >> ./tmp/.ssh/secret.pem
chmod 600 ./tmp/.ssh/secret.pem

scp  -i ./tmp/.ssh/secret.pem -P ${SSH_PORT} -r ./blog/public ${SSH_USER}@${SSH_HOST}:/var/www/blog/
scp  -i ./tmp/.ssh/secret.pem -P ${SSH_PORT} -r ./labs/dist ${SSH_USER}@${SSH_HOST}:/var/www/labs/

rm -rf ./tmp
