from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json
from pyspark.sql.types import StructType, StringType, LongType

spark = SparkSession.builder.appName("myapp").getOrCreate()
spark.sparkContext.setLogLevel("WARN")

# Définition du schéma des données JSON attendues
schema = StructType() \
    .add("username", StringType()) \
    .add("contentId", StringType()) \
    .add("contentCategory", StringType()) \
    .add("interactionType", StringType()) \
    .add("timestamp", LongType())  # Ou StringType si le timestamp est en format de chaîne

# Lecture des messages de Kafka
df = spark \
    .readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "kafka:9092") \
    .option("subscribe", "topic1") \
    .option("maxRequestSize", "1073741824") \
    .load()

# Transformation des messages JSON en DataFrame Spark en utilisant le schéma défini
df = df.selectExpr("CAST(value AS STRING) as json") \
    .select(from_json("json", schema).alias("data")) \
    .select("data.*")

# Affichage des données structurées
query = df.writeStream \
    .outputMode("append") \
    .format("console") \
    .start()

query.awaitTermination()
