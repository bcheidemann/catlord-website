# Terraform Infrastructure

To run terraform locally, follow these steps:

1. Install the [terraform CLI](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
2. Run `cd terraform` to enter this directoy
3. Create an IAM user in the AWS console
4. Get the access key and secret access key for the IAM user from the AWS console
5. Set the variables in [`.env.example`](/terraform/.env.example)
6. Run `terraform init`
7. Run `terraform plan` to check that things are working as expected
8. Run `terraform apply` when you're ready to apply changes
