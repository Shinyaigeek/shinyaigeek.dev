source ./.env

mkdir ./tmp
mkdir ./tmp/.ssh

echo "$VPS_SECRET_KEY" >> ./tmp/.ssh/secret.pem
chmod 600 ./tmp/.ssh/secret.pem

scp  -i ./tmp/.ssh/secret.pem -P ${SSH_PORT} -r ./ops/h2o.conf ${SSH_USER}@${SSH_HOST}:/var/www/blog/

rm -rf ./tmp