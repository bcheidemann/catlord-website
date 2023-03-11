resource "aws_route53_zone" "catlord" {
  name = "catlord.co.uk"

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_route53_record" "catlord" {
  # See https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record#ns-and-soa-record-management
  allow_overwrite = true

  zone_id         = aws_route53_zone.catlord.zone_id
  name            = "catlord.co.uk"
  type            = "NS"
  ttl             = 3600
  records         = aws_route53_zone.catlord.name_servers
}

resource "aws_route53_record" "catlord_server" {
  for_each = var.servers

  zone_id  = aws_route53_zone.catlord.zone_id
  name     = "${each.key}.catlord.co.uk"
  type     = "A"
  ttl      = 300
  records  = [each.value.ip]
}