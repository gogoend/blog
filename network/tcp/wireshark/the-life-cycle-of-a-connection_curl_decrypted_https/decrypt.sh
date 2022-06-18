cipher=aes-256-gcm

iv=6cfdf02584a9cdf050c7324db9826197
master_key=eb0dd0c4cc313e78bcaac863d9c2708a82b56e620eeab860811169738997f0c73beb060a67914e028e1f03426024ccc9

openssl enc \
  -"$cipher" \
  -d \
  -K "$master_key" \
  -iv "$iv" \
  -in ./encrypted_origin_response.bin \
  -out ./decrypted_origin_response.bin
