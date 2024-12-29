#!/bin/bash

DB1=${MYSQL_DATABASE}
DB2=${MYSQL_TEST_DATABASE_PREFIX:-_test_}${MYSQL_DATABASE}
USER=${MYSQL_USER}
ROOT_PW=${MYSQL_ROOT_PASSWORD}

mysql -uroot -p${ROOT_PW} -e "CREATE DATABASE IF NOT EXISTS ${DB1};"
mysql -uroot -p${ROOT_PW} -e "CREATE DATABASE IF NOT EXISTS ${DB2};"

mysql -uroot -p${ROOT_PW} -e "grant all on ${DB1}.* to ${USER}@'%';"
mysql -uroot -p${ROOT_PW} -e "grant all on ${DB2}.* to ${USER}@'%';"
