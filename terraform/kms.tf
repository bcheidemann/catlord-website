# ===================== Terraform state S3 backend =====================
resource "aws_kms_key" "terraform_state_key" {
  description         = "Terraform state S3 backend"
  enable_key_rotation = true
}

resource "aws_kms_alias" "terraform_state_key_alias" {
  name          = "alias/terraform-state"
  target_key_id = aws_kms_key.terraform_state_key.key_id
}

# ===================== Logging bucket =====================
resource "aws_kms_key" "logging_bucket_key" {
  description         = "Logging bucket"
  enable_key_rotation = true
}

resource "aws_kms_alias" "logging_bucket_key_alias" {
  name          = "alias/logging-bucket"
  target_key_id = aws_kms_key.logging_bucket_key.key_id
}

# ===================== Static site bucket =====================
resource "aws_kms_key" "static_site_bucket_key" {
  description         = "Static site bucket"
  enable_key_rotation = true
}

resource "aws_kms_alias" "static_site_bucket_key_alias" {
  name          = "alias/static-site-bucket"
  target_key_id = aws_kms_key.static_site_bucket_key.key_id
}
