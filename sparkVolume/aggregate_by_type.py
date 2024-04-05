from pyspark.sql import SparkSession

def main():
    spark = SparkSession.builder \
        .appName("AggregationParTypesInteraction") \
        .getOrCreate()
    
    spark.sparkContext.setLogLevel("WARN")
    
    # HDFS
    df = spark.read.parquet("hdfs://namenode:9000/result.parquet")
    
    # Agréger les données par 'type_interaction'
    aggregated_data = df.groupBy("username", "interactionType").count().orderBy("username")
    aggregated_data.show()

    spark.stop()

if __name__ == "__main__":
    main()
