# Terraform state S3 backend
# NOTE: This needs to exist before using it as a backend, so if you're
#       re-creating the infrastructure, you'll need to comment out the
#       terraform block below, run `terraform apply`, then uncomment it
#       and run `terraform apply` again.
resource "aws_s3_bucket" "terraform_state" {
  bucket = "catlord-terraform-state"

  tags = {
    Name        = "Terraform State Bucket"
    Environment = "production"
  }

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_acl" "terraform_state_acl" {
  bucket = aws_s3_bucket.terraform_state.id
  acl    = "private"

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "terraform_state_versioning" {
  bucket = aws_s3_bucket.terraform_state.id
  versioning_configuration {
    status = "Enabled"
  }

  lifecycle {
    prevent_destroy = true
  }
}

terraform {
  backend "s3" {
    bucket = "catlord-terraform-state"
    key    = "terraform.tfstate"
    # NOTE: If re-creating the infrastructure, once the bucket has been
    #       created, you'll need to check the region in the AWS console
    region = "eu-west-1"
  }
}
