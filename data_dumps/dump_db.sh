#!/bin/bash

sudo -u postgres pg_dump -c -C -F p --column-inserts --attribute-inserts -d glizzy > glizzy.sql
