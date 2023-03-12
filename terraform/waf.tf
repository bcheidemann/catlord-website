# ===================== Default =====================
# NOTE: This should probably be reused since we are charged per ACL and per rule.
#       However, requests are quite cheap so we will get much better value for money
#       by reusing this ACL and ruleset. See https://aws.amazon.com/waf/pricing/.
resource "aws_wafv2_web_acl" "catlord" {
  provider = aws.us_east_1

  description = "Default web ACL and rules for CatLord"
  name        = "catlord-web-acl"
  scope       = "CLOUDFRONT"

  default_action {
    allow {}
  }

  # Allow only 10000 requests in a span 5 minutes (rate-limiting).
  rule {
    priority = 1
    name     = "rate-limiting"

    action {
      block {}
    }

    statement {
      rate_based_statement {
        limit              = 10000
        aggregate_key_type = "IP"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "catlord-rate-limiting"
      sampled_requests_enabled   = true
    }
  }

  # Block requests from services that allow obfuscation of viewer identity.
  # This uses an AWS managed WAF rule group.
  rule {
    priority = 2
    name     = "anonymous-ip-list"

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesAnonymousIpList"
        vendor_name = "AWS"

        rule_action_override {
          name = "HostingProviderIPList"
          action_to_use {
            block {}
          }
        }
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "catlord-anonymous-ip-list"
      sampled_requests_enabled   = true
    }
  }

  # Block requests from IPs which are part of Amazon threat intelligence.
  # This uses an AWS managed WAF rule group.
  rule {
    priority = 3
    name     = "ip-reputation-list"

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesAmazonIpReputationList"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "catlord-rule-ip-reputation-list"
      sampled_requests_enabled   = true
    }
  }

  # Mitigate SQL Injection attacks.
  rule {
    priority = 4
    name     = "sql-injection"

    action {
      block {}
    }

    statement {
      or_statement {
        # URI
        statement {
          sqli_match_statement {
            field_to_match {
              uri_path {}
            }

            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }

            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }

        # Query String
        statement {
          sqli_match_statement {
            field_to_match {
              all_query_arguments {}
            }

            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }

            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }

        # Body
        statement {
          sqli_match_statement {
            field_to_match {
              body {}
            }

            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }

            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }

        # Header - authorization
        statement {
          sqli_match_statement {
            field_to_match {
              single_header {
                name = "authorization"
              }
            }

            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }

            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }

        # Header - cookie
        statement {
          sqli_match_statement {
            field_to_match {
              single_header {
                name = "cookie"
              }
            }

            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }

            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "catlord-rule-sql-injection"
      sampled_requests_enabled   = true
    }
  }

  # Mitigate Cross Site Scripting (XSS) attacks.
  rule {
    priority = 5
    name     = "xss"

    action {
      block {}
    }

    statement {
      or_statement {
        # URI
        statement {
          xss_match_statement {
            field_to_match {
              uri_path {}
            }

            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }

            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }

        # Query String
        statement {
          xss_match_statement {
            field_to_match {
              all_query_arguments {}
            }

            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }

            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }

        # Body
        statement {
          xss_match_statement {
            field_to_match {
              body {}
            }

            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }

            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }

        # Header - authorization
        statement {
          xss_match_statement {
            field_to_match {
              single_header {
                name = "authorization"
              }
            }

            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }

            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }

        # Header - cookie
        statement {
          xss_match_statement {
            field_to_match {
              single_header {
                name = "cookie"
              }
            }

            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }

            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "catlord-rule-xss"
      sampled_requests_enabled   = true
    }
  }

  # Mitigate Path Traversal (LFI and RFI) attacks.
  rule {
    priority = 6
    name     = "path-traversal"

    action {
      block {}
    }

    statement {
      or_statement {
        # URI
        statement {
          byte_match_statement {
            field_to_match {
              uri_path {}
            }

            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }

            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }

            positional_constraint = "CONTAINS"
            search_string         = "../"
          }
        }

        statement {
          byte_match_statement {
            field_to_match {
              uri_path {}
            }

            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }

            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }

            positional_constraint = "CONTAINS"
            search_string         = "://"
          }
        }

        # Query String
        statement {
          byte_match_statement {
            field_to_match {
              all_query_arguments {}
            }

            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }

            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }

            positional_constraint = "CONTAINS"
            search_string         = "../"
          }
        }
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "catlord-rule-path-traversal"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "catlord"
    sampled_requests_enabled   = true
  }
}
