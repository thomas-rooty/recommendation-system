from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("myapp").getOrCreate()
sc = spark.sparkContext
spark.sparkContext.setLogLevel("WARN")
# Consumer code
df = spark.readStream.format("kafka").option("kafka.bootstrap.servers", "kafka:9092").option("subscribe", "topic1").option("maxRequestSize", "1073741824").load()

# Affichage des donnees 
# query = df.writeStream.outputMode("append").format("console").start()

# Afficher les donnees texte
query = df.selectExpr("CAST(key AS STRING)", "CAST(value AS STRING)").writeStream.outputMode("append").format("console").start()

query.awaitTermination()