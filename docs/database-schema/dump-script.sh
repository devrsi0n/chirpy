pg_dump --host totalk.postgres.database.azure.com --username totalk --schema-only --no-owner postgres > docs/database-schema/create_the_tables.sql

curl --location --request POST 'https://totalk.westus2.azurecontainer.io/v1alpha1/pg_dump' --header 'x-hasura-admin-secret: &DJET64U^WZs' --header 'Content-Type: application/json' --data-raw '{  "opts": ["-O", "-x", "--schema", "public", "--schema", "auth"],  "clean_output": true}' -o docs/database-schema/backup.sql
