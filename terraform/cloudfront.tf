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

# ===================== Outright Server =====================

resource "aws_cloudfront_distribution" "outright_production_server_distribution" {
  origin {
    connection_attempts      = 3
    connection_timeout       = 10
    domain_name              = "outright.catlord.co.uk"
    origin_id                = "outright.catlord.co.uk"

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_protocol_policy   = "http-only"
      origin_ssl_protocols     = ["TLSv1", "TLSv1.1", "TLSv1.2"]
      origin_keepalive_timeout = 5
      origin_read_timeout      = 30
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  web_acl_id          = aws_wafv2_web_acl.catlord.arn
  http_version        = "http2"

  default_cache_behavior {
    allowed_methods            = ["GET", "HEAD"]
    cached_methods             = ["GET", "HEAD"]
    # Using the CachingDisabled managed policy ID
    cache_policy_id            = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
    # Using the Managed-AllViewer managed policy ID
    origin_request_policy_id   = "216adef6-5c7f-47e4-b989-5492eafa07d3"
    # Using the Managed-CORS-with-preflight-and-SecurityHeadersPolicy managed policy ID
    response_headers_policy_id = "eaab4381-ed33-4a86-88ca-d9558dc6cd63"
    compress                   = true
    target_origin_id           = "outright.catlord.co.uk"
    viewer_protocol_policy     = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  
  viewer_certificate {
    acm_certificate_arn            = aws_acm_certificate_validation.catlord_static_site_cert_validation.certificate_arn
    ssl_support_method             = "sni-only"
    minimum_protocol_version       = "TLSv1.2_2021"
  }
}
