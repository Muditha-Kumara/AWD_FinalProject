#!/bin/bash

docker-compose down

docker rmi mudithadocker/awd:phase-3-local -f

docker rmi awd_finalproject_backend:latest -f

docker build --build-arg VITE_API_URL=http://localhost:3000/api -t mudithadocker/awd:phase-3-local ./frontend

docker-compose up