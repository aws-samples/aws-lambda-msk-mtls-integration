#!/usr/bin/env bash

set -e

CLUSTER_ARN=$1
PRODUCER_FUNCTION_NAME=$2

die() {
  echo >&2 "$@"
  exit 1
}

[ "$#" -eq 2 ] || die "Usage: setup.sh <cluster ARN> <PRODUCER_FUNCTION_NAME>"

BOOTSTRAP_BROKERS=$(aws kafka get-bootstrap-brokers --cluster-arn $CLUSTER_ARN --query 'BootstrapBrokerStringTls' --output text)
echo "bootstrapservers: $BOOTSTRAP_BROKERS"

aws lambda update-function-configuration --function-name $PRODUCER_FUNCTION_NAME --environment '{"Variables":{"KAFKA_HOSTS":"'"$BOOTSTRAP_BROKERS"'"}}'