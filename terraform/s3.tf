# ===================== Logging bucket =====================
# See https://aquasecurity.github.io/tfsec/v1.28.1/checks/aws/s3/enable-bucket-logging/
resource "aws_s3_bucket" "logging_bucket" {
  bucket = "catlord-logging"

  tags = {
    Name        = "Logging Bucket"
    Environment = "production"
  }

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_acl" "logging_bucket_acl" {
  bucket = aws_s3_bucket.logging_bucket.id
  acl    = "private"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "logging_bucket_server_side_encryption_configuration" {
  bucket = aws_s3_bucket.logging_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.logging_bucket_key.arn
      sse_algorithm     = "aws:kms"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "logging_bucket_public_access_block" {
  bucket                  = aws_s3_bucket.logging_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_logging" "logging_bucket_logging" {
  bucket = aws_s3_bucket.logging_bucket.id

  target_bucket = aws_s3_bucket.logging_bucket.id
  target_prefix = "aws_s3_bucket/logging_bucket_logging/"
}

resource "aws_s3_bucket_versioning" "logging_bucket_versioning" {
  bucket = aws_s3_bucket.logging_bucket.id
  versioning_configuration {
    status = "Enabled"
  }

  lifecycle {
    prevent_destroy = true
  }
}

# ===================== Terraform state S3 backend =====================
# NOTE: This needs to exist before using it as a backend, so if you're
#       re-creating the infrastructure, you'll need to comment out the
#       terraform block below, run `terraform apply`, then uncomment it
#       and run `terraform apply` again, or create the bucket manually.
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
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state_server_side_encryption_configuration" {
  bucket = aws_s3_bucket.terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.terraform_state_key.arn
      sse_algorithm     = "aws:kms"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "terraform_state_public_access_block" {
  bucket = aws_s3_bucket.terraform_state.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_logging" "terraform_state_logging" {
  bucket = aws_s3_bucket.terraform_state.id

  target_bucket = aws_s3_bucket.logging_bucket.id
  target_prefix = "aws_s3_bucket/terraform_state_logging/"
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

# ===================== Static Site =====================
# TODO: See "aws_s3_bucket_server_side_encryption_configuration" below
# tfsec:ignore:aws-s3-enable-bucket-encryption tfsec:ignore:aws-s3-encryption-customer-key
resource "aws_s3_bucket" "catlord_static_site" {
  bucket = "catlord-static-site"

  tags = {
    Name        = "Static Site"
    Environment = "production"
  }
}

resource "aws_s3_bucket_acl" "catlord_static_site_acl" {
  bucket = aws_s3_bucket.catlord_static_site.id
  acl    = "private"
}

# TODO: Configure cloudfront to use the KMS key
# resource "aws_s3_bucket_server_side_encryption_configuration" "catlord_static_site_server_side_encryption_configuration" {
#   bucket = aws_s3_bucket.catlord_static_site.id

#   rule {
#     apply_server_side_encryption_by_default {
#       kms_master_key_id = aws_kms_key.static_site_bucket_key.arn
#       sse_algorithm     = "aws:kms"
#     }
#   }
# }

resource "aws_s3_bucket_public_access_block" "catlord_static_site_public_access_block" {
  bucket                  = aws_s3_bucket.catlord_static_site.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  # TODO: Use aws_s3_bucket_policy to restrict access to the bucket to only CloudFront
  restrict_public_buckets = false # tfsec:ignore:aws-s3-no-public-buckets
}

resource "aws_s3_bucket_logging" "catlord_static_site_logging" {
  bucket = aws_s3_bucket.catlord_static_site.id

  target_bucket = aws_s3_bucket.logging_bucket.id
  target_prefix = "aws_s3_bucket/catlord_static_site_logging/"
}

resource "aws_s3_bucket_versioning" "catlord_static_site_versioning" {
  bucket = aws_s3_bucket.catlord_static_site.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_policy" "catlord_static_site_policy" {
  bucket = aws_s3_bucket.catlord_static_site.id
  policy = templatefile(
    "templates/s3-static-site-policy.json",
    { bucket = aws_s3_bucket.catlord_static_site.bucket }
  )
}

resource "aws_s3_bucket_cors_configuration" "catlord_static_site_cors_configuration" {
  bucket = aws_s3_bucket.catlord_static_site.id

  cors_rule {
    allowed_headers = ["Authorization", "Content-Length"]
    allowed_methods = ["GET", "POST"]
    allowed_origins = [
      "https://catlord.co.uk",
      "https://www.catlord.co.uk"
    ]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_website_configuration" "catlord_static_site_website_configuration" {
  bucket = aws_s3_bucket.catlord_static_site.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}
