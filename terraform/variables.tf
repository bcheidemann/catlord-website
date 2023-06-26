variable "servers" {
  type = map(object({
    ip = string
  }))
  default = {
    "prod" = {
      ip = "54.37.244.200"
    },
    "survival" = {
      ip = "54.37.244.200"
    },
    "creative" = {
      ip = "54.37.244.200"
    },
    "race" = {
      ip = "54.37.244.200"
    },
    "outright" = {
      ip = "54.37.244.200"
    }
  }
}
