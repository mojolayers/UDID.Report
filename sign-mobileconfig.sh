#!/bin/bash

## Randomise Profile UUID ##
UUID=$(od -x /dev/urandom | head -1 | awk '{OFS="-"; print $2$3,$4,$5,$6,$7$8$9}')
SEARCH="REPLACEME"
TEMPNAME="temp.mobileconfig"
# cp ./paper_plane.mobileconfig ./temp.mobileconfig

# sed -i "s/$SEARCH/$UUID/gi" $TEMPNAME

certs="./ssl_certificates"

openssl smime \
    -sign \
    -signer ${certs}/certificate.crt \
    -inkey ${certs}/private.key \
    -certfile ${certs}/ca_bundle.crt \
    -nodetach \
    -outform der \
    -in ./paper_plane.mobileconfig \
    -out ./www/assets/paper_plane.mobileconfig