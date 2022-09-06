#!/bin/bash

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