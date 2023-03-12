# ===================== Static Site SSL Certificate =====================
resource "aws_acm_certificate" "catlord_static_site_ssl_certificate" {
  provider                  = aws.us_east_1
  domain_name               = "catlord.co.uk"
  subject_alternative_names = ["*.catlord.co.uk"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}



resource "aws_acm_certificate_validation" "catlord_static_site_cert_validation" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.catlord_static_site_ssl_certificate.arn
  validation_record_fqdns = [for record in aws_route53_record.catlord_dns_validation : record.fqdn]
}
