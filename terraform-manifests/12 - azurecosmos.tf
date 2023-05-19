resource "azurerm_cosmosdb_account" "db" {
  name = "retocosmosdb-beta"
  location = azurerm_resource_group.aks_rg.location
  resource_group_name = azurerm_resource_group.aks_rg.name
  offer_type = "Standard"
  kind = "MongoDB"

  consistency_policy {
      consistency_level = "Session"
  }

  geo_location {
    location = azurerm_resource_group.aks_rg.location
    failover_priority = 0
  }
}

resource "azurerm_cosmosdb_mongo_database" "db" {
  name = var.cosmosdbname
  resource_group_name = azurerm_resource_group.aks_rg.name
  account_name = azurerm_cosmosdb_account.db.name
  throughput = 400
}

resource "azurerm_cosmosdb_mongo_collection" "collection" {
  name = var.cosmosdbcollection
  resource_group_name = azurerm_resource_group.aks_rg.name
  account_name = azurerm_cosmosdb_account.db.name
  database_name = azurerm_cosmosdb_mongo_database.db.name
  default_ttl_seconds = "777"
  shard_key           = "uniqueKey"
  throughput          = 400
  index {
    keys   = ["_id"]
    unique = true
  }
}
