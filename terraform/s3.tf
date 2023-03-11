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

# ===================== Static Site =====================
resource "aws_s3_bucket" "catlord_static_site" {
  bucket = "catlord-static-site"

  tags = {
    Name        = "Static Site"
    Environment = "production"
  }
}

resource "aws_s3_bucket_acl" "catlord_static_site_acl" {
  bucket = aws_s3_bucket.catlord_static_site.id
  acl    = "public-read"
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
