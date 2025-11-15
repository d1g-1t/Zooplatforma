#!/bin/bash

#  ^=   ^`   ^e                 ^`     ^b   ^`   ^n,             ^e       ^b ^a ^o  ^a   ^`     ^b
cd "$(dirname "$0")"

set -a
[ -f .env ] && . .env
set +a

domains=(zooplatforma.ru)
rsa_key_size=4096
data_path="./certbot"
email="$CERTBOT_EMAIL"
staging=0

if [ -d "$data_path" ]; then
  echo "Existing data found for ${domains[*]}."
  read -rp "Do you want to replace the existing certificate? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

webroot_path="/var/www/certbot"

echo "### Creating dummy certificate for ${domains[*]} ..."
mkdir -p "$data_path/conf/live/${domains[0]}"
docker-compose -f docker-compose.production.yml run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1 \
    -keyout '/etc/letsencrypt/live/${domains[0]}/privkey.pem' \
    -out '/etc/letsencrypt/live/${domains[0]}/fullchain.pem' \
    -subj '/CN=localhost'" certbot
echo

echo "### Starting nginx ..."
docker-compose -f docker-compose.production.yml up --force-recreate -d nginx
echo

echo "### Deleting dummy certificate for ${domains[*]} ..."
docker-compose -f docker-compose.production.yml run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/${domains[0]} && \
  rm -Rf /etc/letsencrypt/archive/${domains[0]} && \
  rm -Rf /etc/letsencrypt/renewal/${domains[0]}.conf" certbot
echo

echo "### Requesting Let's Encrypt certificate for ${domains[*]} ..."
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done

email_arg="--email $email"

staging_arg=""
if [ $staging != "0" ]; then
  staging_arg="--staging"
fi

docker-compose -f docker-compose.production.yml run --rm --entrypoint "\
  certbot certonly --webroot -w $webroot_path \
    $domain_args \
    $email_arg \
    $staging_arg \
    --agree-tos \
    --no-eff-email \
    --rsa-key-size $rsa_key_size \
    --force-renewal" certbot
echo

echo "### Reloading nginx ..."
docker-compose -f docker-compose.production.yml exec nginx nginx -s reload