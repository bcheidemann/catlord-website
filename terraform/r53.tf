resource "aws_route53_zone" "catlord" {
  name = "catlord.co.uk"

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_route53_record" "catlord" {
  # See https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record#ns-and-soa-record-management
  allow_overwrite = true

  zone_id = aws_route53_zone.catlord.zone_id
  name    = "catlord.co.uk"
  type    = "NS"
  ttl     = 3600
  records = aws_route53_zone.catlord.name_servers
}

// DNS validation
resource "aws_route53_record" "catlord_dns_validation" {
  for_each = {
    for dvo in aws_acm_certificate.catlord_static_site_ssl_certificate.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true

  name    = each.value.name
  records = [each.value.record]
  ttl     = 60
  type    = each.value.type
  zone_id = aws_route53_zone.catlord.zone_id
}

resource "aws_route53_record" "catlord_static_site" {
  zone_id = aws_route53_zone.catlord.zone_id
  name    = "catlord.co.uk"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.catlord_static_site_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.catlord_static_site_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "catlord_static_site_www" {
  zone_id = aws_route53_zone.catlord.zone_id
  name    = "www.catlord.co.uk"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.catlord_static_site_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.catlord_static_site_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

# resource "aws_route53_record" "catlord_static_site_www" {
#   zone_id = aws_route53_zone.catlord.zone_id
#   name    = "www.catlord.co.uk"
#   type    = "CNAME"
#   ttl     = 300
#   records = ["catlord.co.uk"]
# }


resource "aws_route53_record" "catlord_server" {
  for_each = var.servers

  zone_id = aws_route53_zone.catlord.zone_id
  name    = "${each.key}.catlord.co.uk"
  type    = "A"
  ttl     = 300
  records = [each.value.ip]
}

resource "aws_route53_record" "catlord_server_dev" {
  zone_id = aws_route53_zone.catlord.zone_id
  name    = "dev.catlord.co.uk"
  type    = "CNAME"
  ttl     = 300
  records = ["acornpi.duckdns.org"]
}
