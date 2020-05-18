#!/bin/bash

if [ "$ENV" = "production" ]; then
    echo Production mode

    cp /app/nginxsettings/production.conf /app/nginx/nginx.conf 
    # pwd
else
    echo Development mode

    cp /app/nginxsettings/dev.conf /app/nginx/nginx.conf 

fi
date
