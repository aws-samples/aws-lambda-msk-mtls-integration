#!/usr/bin/env bash

set -e

NO_OF_MESSAGES=$3
PRODUCER_FUNCTION_NAME=$1
TOPIC_NAME=$2
die() {
  echo >&2 "$@"
  exit 1
}

[ "$#" -eq 3 ] || die "Usage: setup.sh  <PRODUCER_FUNCTION_NAME> <TOPIC_NAME> <NO_OF_MESSAGES>"

aws lambda invoke --function-name $PRODUCER_FUNCTION_NAME --cli-binary-format raw-in-base64-out \
--payload '{ "newTopic": "CREATE_TOPIC", "topicName": "'$TOPIC_NAME'"}' \
response.json

while [  $NO_OF_MESSAGES -gt 0 ]; do
    aws lambda invoke --function-name $PRODUCER_FUNCTION_NAME --invocation-type Event --cli-binary-format raw-in-base64-out \
    --payload '{ "message": "Hello Kafka", "topicName": "'$TOPIC_NAME'"}' \
    response.json
    let NO_OF_MESSAGES-=1
done
