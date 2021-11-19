# Lambda Support for MSK mTLS authentication

You can enable client authentication on their Amazon Managed Streaming Kafka (MSK) clusters in order to ensure that only trusted clients are able to connect to their Kafka brokers. When creating an event source mapping between a Lambda function and an MSK cluster or Kafka cluster, You can provide the client certificate, private key as AWS Secret Manager secret ARN

This repo contains code for setting up AWS Lambda as a consumer of Amazon MSK cluster using mTLS authentication.
Follow the [blog post](https://aws.amazon.com/blogs/compute/introducing-mutual-tls-authentication-for-amazon-msk-as-an-event-source/) to learn more about the integration and for a step by step guidance for set up.


## Requirements

* AWS CLI already configured with Administrator permission

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.

