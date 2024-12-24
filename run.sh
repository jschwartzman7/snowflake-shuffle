mkdir -p bin
javac -cp "lib/*" -d bin $(find src -name "*.java")
echo "Program Compiled Successfully"
java -cp "lib/*:bin" SnowflakeShuffle
echo "Program Ended"
