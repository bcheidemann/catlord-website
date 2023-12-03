terraform {
  required_version = "~> 1.6.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.58.0"
    }
  }

  backend "s3" {
    bucket = "catlord-terraform-state"
    key    = "terraform.tfstate"
    # NOTE: If re-creating the infrastructure, once the bucket has been
    #       created, you'll need to check the region in the AWS console
    region = "eu-west-1"
  }
}

provider "aws" {
  region = "eu-west-1"
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
