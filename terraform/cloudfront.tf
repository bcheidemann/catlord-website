# ===================== Static Site =====================
resource "aws_cloudfront_distribution" "catlord_static_site_distribution" {
  origin {
    domain_name = aws_s3_bucket_website_configuration.catlord_static_site_website_configuration.website_endpoint
    origin_id   = "S3-catlord-static-site"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  web_acl_id          = aws_wafv2_web_acl.catlord.arn

  aliases = [
    "catlord.co.uk",
    "www.catlord.co.uk"
  ]

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 200
    response_page_path    = "/404.html"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-catlord-static-site"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 31536000
    default_ttl            = 31536000
    max_ttl                = 31536000
    compress               = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.catlord_static_site_cert_validation.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  logging_config {
    include_cookies = false
    bucket          = "${aws_s3_bucket.logging_bucket.bucket}.s3.amazonaws.com"
    prefix          = "aws_cloudfront_distribution/catlord_static_site_distribution/"
  }
}

# ===================== Static Site =====================
resource "aws_cloudfront_distribution" "catlord_files_distribution" {
  origin {
    domain_name = aws_s3_bucket_website_configuration.catlord_files_website_configuration.website_endpoint
    origin_id   = "S3-catlord-files"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  web_acl_id          = aws_wafv2_web_acl.catlord.arn

  aliases = [
    "files.catlord.co.uk"
  ]

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 200
    response_page_path    = "/404.html"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-catlord-files"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 31536000
    default_ttl            = 31536000
    max_ttl                = 31536000
    compress               = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.catlord_static_site_cert_validation.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  logging_config {
    include_cookies = false
    bucket          = "${aws_s3_bucket.logging_bucket.bucket}.s3.amazonaws.com"
    prefix          = "aws_cloudfront_distribution/catlord_files_distribution/"
  }
}

// ===================== Outright API =====================
resource "aws_cloudfront_distribution" "outright_api_distribution" {
  origin {
    domain_name = "server.outright.api.catlord.co.uk"
    origin_id   = "APIOrigin"

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_protocol_policy   = "https-only"
      origin_ssl_protocols     = ["TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "APIOrigin"

    forwarded_values {
      query_string = true
      headers      = ["*"]
      cookies {
        forward = "all"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    
    # Set the TTL values to 0 to effectively disable caching
    min_ttl     = 0
    default_ttl = 0
    max_ttl     = 0
  }

  viewer_certificate {
    acm_certificate_arn            = aws_acm_certificate_validation.catlord_static_site_cert_validation.certificate_arn
    ssl_support_method             = "sni-only"
    minimum_protocol_version       = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  logging_config {
    include_cookies = false
    bucket          = "${aws_s3_bucket.logging_bucket.bucket}.s3.amazonaws.com"
    prefix          = "aws_cloudfront_distribution/outright_api_distribution/"
  }
}
