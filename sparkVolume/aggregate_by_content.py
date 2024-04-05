from pyspark.sql import SparkSession

def main():
    spark = SparkSession.builder \
        .appName("AggregationParTypesInteraction") \
        .getOrCreate()
    
    spark.sparkContext.setLogLevel("WARN")
    
    df = spark.read.parquet("hdfs://namenode:9000/result.parquet")
    
    aggregated_data = df.groupBy("contentCategory", "interactionType").count().orderBy("username")
    aggregated_data.show()

    spark.stop()

if __name__ == "__main__":
    main()
