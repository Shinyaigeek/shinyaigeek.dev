source ./.env

mkdir ./tmp
mkdir ./tmp/.ssh

echo "$VPS_SECRET_KEY" >> ./tmp/.ssh/secret.pem
chmod 600 ./tmp/.ssh/secret.pem

ssh -i ./tmp/.ssh/secret.pem -p ${SSH_PORT} ${SSH_USER}@${SSH_HOST}

rm -rf ./tmp