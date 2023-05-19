resource "azurerm_cosmosdb_account" "db" {
  name = "retocosmosdb-alpha"
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

resource "azurerm_cosmosdb_sql_database" "db" {
  name = var.cosmosdbname
  resource_group_name = azurerm_resource_group.aks_rg.name
  account_name = azurerm_cosmosdb_account.db.name
}

resource "azurerm_cosmosdb_sql_container" "container" {
  name = var.cosmosdbcontainer
  resource_group_name = azurerm_resource_group.aks_rg.name
  account_name = azurerm_cosmosdb_account.db.name
  database_name = azurerm_cosmosdb_sql_database.db.name
  partition_key_path = "/id"
  throughput = 400
}
